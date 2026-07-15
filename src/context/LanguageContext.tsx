import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Lang = 'en' | 'pt'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LangCtx>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem('244-lang')
    return (stored === 'pt' ? 'pt' : 'en') as Lang
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('244-lang', l)
    document.documentElement.lang = l
  }

  useEffect(() => {
    document.documentElement.lang = lang
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
