import { useEffect, useMemo, useState } from 'react'
import { useT } from '../i18n'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { csvToObjects } from '../utils/csv'
import { asset } from '../utils/asset'

// ================================================================
// 244 TRACKER — DATA SOURCE
// Paste the CSV export URL of your published Google Sheet here.
// Google Sheet: File > Share > Publish to web > pick the sheet/tab
// > Comma-separated values (.csv) > Publish, then paste the link below.
// ================================================================
const TRACKER_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRI6sWw3wQypbGZzUEMbx9mfAUYDXWL-qMtGhk7UW8AJGHTz5Nd1DU8kx5LJJYemfSxbUkafTr2SR4I/pub?gid=1697852487&single=true&output=csv'

const STATUS_STORAGE_KEY = '244-tracker-status'

const STATUS_SLUGS = ['not_applied', 'applied', 'in_progress', 'interview', 'offer', 'rejected'] as const
type StatusSlug = typeof STATUS_SLUGS[number]

const PREFERRED_TYPE_ORDER = [
  'Summer Internships', 'Spring Internships', 'Spring Weeks', 'Off-Cycle',
  'Industrial Placements', 'Graduate Programmes', 'Events',
]

// TEMPORARY: hide the 244 Partners tier until partner data is finalized. Remove this constant
// and its use below to bring 244 Partner rows back into the tracker.
const HIDDEN_TIERS = ['244 Partners']

type OpenStatus = 'open' | 'opening-soon' | 'closed'

interface TrackerRow {
  id: string
  type: string
  tier: string
  company: string
  programme: string
  openingDateRaw: string
  closingDateRaw: string
  openingDate: Date | null
  closingDate: Date | null
  latestStage: string
  process: string
  coverLetter: boolean
  sponsorsVisa: boolean
  partner: boolean
  applyLink: string
}

function parseSheetDate(raw: string): Date | null {
  const value = raw.trim()
  if (!value) return null
  const iso = new Date(value)
  if (!isNaN(iso.getTime())) return iso
  const ukMatch = value.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/)
  if (ukMatch) {
    const [, d, m, y] = ukMatch
    const year = y.length === 2 ? Number(y) + 2000 : Number(y)
    const date = new Date(year, Number(m) - 1, Number(d))
    if (!isNaN(date.getTime())) return date
  }
  return null
}

function slugify(...parts: string[]) {
  return parts.join('__').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
}

function toBool(value: string) {
  return value.trim().toLowerCase() === 'yes'
}

function toTrackerRow(raw: Record<string, string>): TrackerRow {
  const type = raw['Type'] ?? ''
  const company = raw['Company'] ?? ''
  const programme = raw['Programme'] ?? ''
  return {
    id: slugify(type, company, programme),
    type,
    tier: raw['Tier'] ?? 'Other',
    company,
    programme,
    openingDateRaw: raw['Opening Date'] ?? '',
    closingDateRaw: raw['Closing Date'] ?? '',
    openingDate: parseSheetDate(raw['Opening Date'] ?? ''),
    closingDate: parseSheetDate(raw['Closing Date'] ?? ''),
    latestStage: raw['Latest Stage'] ?? '',
    process: raw['Process'] ?? '',
    coverLetter: toBool(raw['Cover Letter'] ?? ''),
    sponsorsVisa: toBool(raw['Sponsors Visas'] ?? ''),
    partner: toBool(raw['244 Partner'] ?? ''),
    applyLink: raw['Apply Link'] ?? '',
  }
}

function getOpenStatus(row: TrackerRow): OpenStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (row.closingDate && row.closingDate < today) return 'closed'
  if (row.openingDate && row.openingDate > today) {
    const daysUntilOpen = (row.openingDate.getTime() - today.getTime()) / 86400000
    if (daysUntilOpen <= 14) return 'opening-soon'
  }
  return 'open'
}

function loadStatusMap(): Record<string, StatusSlug> {
  try {
    const raw = localStorage.getItem(STATUS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export default function TrackerPage() {
  const t = useT()
  const tr = t.tracker
  useScrollReveal()

  const [rows, setRows] = useState<TrackerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [statusMap, setStatusMap] = useState<Record<string, StatusSlug>>(() => loadStatusMap())
  const [collapsedTiers, setCollapsedTiers] = useState<Set<string>>(new Set())

  const [activeType, setActiveType] = useState('all')
  const [search, setSearch] = useState('')
  const [myStatusFilter, setMyStatusFilter] = useState<'all' | StatusSlug>('all')
  const [openStatusFilter, setOpenStatusFilter] = useState<'all' | OpenStatus>('all')
  const [coverLetterFilter, setCoverLetterFilter] = useState<'all' | 'yes' | 'no'>('all')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(false)
      try {
        const res = await fetch(TRACKER_CSV_URL, { cache: 'no-store' })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const text = await res.text()
        const parsed = csvToObjects(text).map(toTrackerRow)
        if (!cancelled) { setRows(parsed); setLoading(false) }
      } catch {
        if (!cancelled) { setError(true); setLoading(false) }
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const setStatusFor = (rowId: string, status: StatusSlug) => {
    setStatusMap(prev => {
      const next = { ...prev, [rowId]: status }
      try { localStorage.setItem(STATUS_STORAGE_KEY, JSON.stringify(next)) } catch { /* storage unavailable */ }
      return next
    })
  }

  const toggleTier = (tier: string) => {
    setCollapsedTiers(prev => {
      const next = new Set(prev)
      next.has(tier) ? next.delete(tier) : next.add(tier)
      return next
    })
  }

  const types = useMemo(() => {
    const present = new Set(rows.map(r => r.type).filter(Boolean))
    const ordered = PREFERRED_TYPE_ORDER.filter(type => present.has(type))
    const extra = [...present].filter(type => !PREFERRED_TYPE_ORDER.includes(type)).sort()
    return [...ordered, ...extra]
  }, [rows])

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase()
    return rows.filter(row => {
      if (HIDDEN_TIERS.includes(row.tier)) return false
      if (activeType !== 'all' && row.type !== activeType) return false
      if (query && !row.company.toLowerCase().includes(query) && !row.programme.toLowerCase().includes(query)) return false
      const myStatus = statusMap[row.id] ?? 'not_applied'
      if (myStatusFilter !== 'all' && myStatus !== myStatusFilter) return false
      if (openStatusFilter !== 'all' && getOpenStatus(row) !== openStatusFilter) return false
      if (coverLetterFilter !== 'all' && row.coverLetter !== (coverLetterFilter === 'yes')) return false
      return true
    })
  }, [rows, activeType, search, myStatusFilter, openStatusFilter, coverLetterFilter, statusMap])

  const tierGroups = useMemo(() => {
    const map = new Map<string, TrackerRow[]>()
    filteredRows.forEach(row => {
      if (!map.has(row.tier)) map.set(row.tier, [])
      map.get(row.tier)!.push(row)
    })
    return [...map.entries()]
  }, [filteredRows])

  const formatDate = (row: TrackerRow, field: 'openingDate' | 'closingDate', raw: string) => {
    const date = row[field]
    if (!date) return raw || '—'
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  return (
    <>
      <div className="page-hero page-hero-split reveal">
        <div className="page-hero-logo tracker-logo-desktop">
          <img src={asset('/assets/logo.png')} alt="244 Club logo" />
        </div>
        <div className="page-hero-text">
          <span className="label">{tr.label}</span>
          <div className="tracker-hero-row">
            <h1>{tr.h1Lines[0]}<br /><em>{tr.h1Lines[1]}</em></h1>
            <div className="tracker-logo-mobile">
              <img src={asset('/assets/logo.png')} alt="244 Club logo" />
            </div>
          </div>
          <p>{tr.intro}</p>
        </div>
      </div>

      <div className="tracker-page">
        {loading && (
          <div className="tracker-state reveal">
            <p>{tr.loading}</p>
          </div>
        )}

        {!loading && error && (
          <div className="tracker-state tracker-state-error">
            <h3>{tr.errorTitle}</h3>
            <p>{tr.errorText}</p>
            <button className="btn btn-outline" onClick={() => window.location.reload()}>{tr.retry}</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="tracker-tabs" role="tablist">
              <button
                className={`tracker-tab${activeType === 'all' ? ' active' : ''}`}
                onClick={() => setActiveType('all')}
              >
                {tr.tabAll}
              </button>
              {types.map(type => (
                <button
                  key={type}
                  className={`tracker-tab${activeType === type ? ' active' : ''}`}
                  onClick={() => setActiveType(type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="tracker-filters">
              <div className="field tracker-filter-search">
                <label htmlFor="tracker-search">{tr.searchLabel}</label>
                <input
                  id="tracker-search"
                  type="text"
                  placeholder={tr.searchPlaceholder}
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="tracker-mystatus">{tr.myStatusLabel}</label>
                <select id="tracker-mystatus" value={myStatusFilter} onChange={e => setMyStatusFilter(e.target.value as typeof myStatusFilter)}>
                  <option value="all">{tr.myStatusAll}</option>
                  {STATUS_SLUGS.map((slug, i) => (
                    <option key={slug} value={slug}>{tr.statusOptions[i]}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label htmlFor="tracker-openstatus">{tr.openStatusLabel}</label>
                <select id="tracker-openstatus" value={openStatusFilter} onChange={e => setOpenStatusFilter(e.target.value as typeof openStatusFilter)}>
                  <option value="all">{tr.openStatusAll}</option>
                  <option value="open">{tr.openStatusOpen}</option>
                  <option value="opening-soon">{tr.openStatusSoon}</option>
                  <option value="closed">{tr.openStatusClosed}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="tracker-coverletter">{tr.coverLetterLabel}</label>
                <select id="tracker-coverletter" value={coverLetterFilter} onChange={e => setCoverLetterFilter(e.target.value as typeof coverLetterFilter)}>
                  <option value="all">{tr.coverLetterAll}</option>
                  <option value="yes">{tr.coverLetterYes}</option>
                  <option value="no">{tr.coverLetterNo}</option>
                </select>
              </div>
            </div>

            {tierGroups.length === 0 && (
              <div className="tracker-state"><p>{tr.empty}</p></div>
            )}

            {tierGroups.map(([tier, tierRows]) => {
              const collapsed = collapsedTiers.has(tier)
              return (
                <div key={tier} className="tracker-tier">
                  <button className="tracker-tier-header" onClick={() => toggleTier(tier)} aria-expanded={!collapsed}>
                    <span className={`tracker-tier-chevron${collapsed ? ' collapsed' : ''}`} aria-hidden="true">▾</span>
                    <span>{tier}</span>
                    <span className="tracker-tier-count">{tierRows.length}</span>
                  </button>

                  {!collapsed && (
                    <>
                      <div className="tracker-table-wrap">
                        <table className="tracker-table">
                          <thead>
                            <tr>
                              <th>{tr.columns.status}</th>
                              <th>{tr.columns.company}</th>
                              <th>{tr.columns.programme}</th>
                              <th>{tr.columns.opening}</th>
                              <th>{tr.columns.closing}</th>
                              <th>{tr.columns.stage}</th>
                              <th>{tr.columns.process}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tierRows.map(row => {
                              const status = getOpenStatus(row)
                              const myStatus = statusMap[row.id] ?? 'not_applied'
                              return (
                                <tr key={row.id} className={row.partner ? 'tracker-row-partner' : ''}>
                                  <td>
                                    <select
                                      className="tracker-status-select"
                                      value={myStatus}
                                      onChange={e => setStatusFor(row.id, e.target.value as StatusSlug)}
                                      aria-label={tr.columns.status}
                                    >
                                      {STATUS_SLUGS.map((slug, i) => (
                                        <option key={slug} value={slug}>{tr.statusOptions[i]}</option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="tracker-company">
                                    {row.partner && <span className="tracker-partner-badge">{tr.partnerBadge}</span>}
                                    {row.company}
                                  </td>
                                  <td>
                                    {row.applyLink
                                      ? <a href={row.applyLink} target="_blank" rel="noopener noreferrer">{row.programme}</a>
                                      : row.programme}
                                  </td>
                                  <td className={`tracker-date tracker-date-${status}`}>{formatDate(row, 'openingDate', row.openingDateRaw)}</td>
                                  <td className={`tracker-date tracker-date-${status}`}>{formatDate(row, 'closingDate', row.closingDateRaw)}</td>
                                  <td>{row.latestStage}</td>
                                  <td>{row.process}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>

                      <div className="tracker-cards">
                        {tierRows.map(row => {
                          const status = getOpenStatus(row)
                          const myStatus = statusMap[row.id] ?? 'not_applied'
                          return (
                            <div key={row.id} className={`tracker-card${row.partner ? ' tracker-card-partner' : ''}`}>
                              {row.partner && <span className="tracker-partner-badge">{tr.partnerBadge}</span>}
                              <h4>
                                {row.applyLink
                                  ? <a href={row.applyLink} target="_blank" rel="noopener noreferrer">{row.company} — {row.programme}</a>
                                  : `${row.company} — ${row.programme}`}
                              </h4>
                              <div className="tracker-card-row">
                                <span>{tr.columns.opening}</span>
                                <span className={`tracker-date tracker-date-${status}`}>{formatDate(row, 'openingDate', row.openingDateRaw)}</span>
                              </div>
                              <div className="tracker-card-row">
                                <span>{tr.columns.closing}</span>
                                <span className={`tracker-date tracker-date-${status}`}>{formatDate(row, 'closingDate', row.closingDateRaw)}</span>
                              </div>
                              <div className="tracker-card-row"><span>{tr.columns.stage}</span><span>{row.latestStage || '—'}</span></div>
                              <div className="tracker-card-row"><span>{tr.columns.process}</span><span>{row.process || '—'}</span></div>
                              <div className="field">
                                <label>{tr.columns.status}</label>
                                <select value={myStatus} onChange={e => setStatusFor(row.id, e.target.value as StatusSlug)}>
                                  {STATUS_SLUGS.map((slug, i) => (
                                    <option key={slug} value={slug}>{tr.statusOptions[i]}</option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              )
            })}

            <p className="tracker-updated">{tr.updated}</p>

            {/* NOTIFICATIONS: not built yet — placeholder only, per current scope */}
            <div className="tracker-notif-placeholder">
              <span className="label">{tr.notifTitle}</span>
              <p>{tr.notifText}</p>
            </div>
          </>
        )}
      </div>
    </>
  )
}
