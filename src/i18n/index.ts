import en from './en'
import pt from './pt'
import { useLang } from '../context/LanguageContext'

export const translations = { en, pt }

export function useT() {
  const { lang } = useLang()
  return translations[lang]
}
