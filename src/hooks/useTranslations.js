import { useContext } from 'react'
import { TranslationContext } from '../contexts/TranslationContext'

export const useTranslation = (namespace) => {
	const { i18n } = useContext(TranslationContext)

	const translate = (key) => {
		return i18n.t(`${namespace}.${key}`)
	}

	return {
		translate,
	}
}
