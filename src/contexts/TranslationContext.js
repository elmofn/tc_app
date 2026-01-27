import {
	createContext,
	useEffect,
	useState,
} from 'react'
import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import { useStorage } from '../hooks/useStorage'

import ptBr from '../assets/translations/pt-BR.json'
import enUs from '../assets/translations/en-US.json'
import es from '../assets/translations/es.json'

export const TranslationContext = createContext({
	i18n: new I18n(),
	setLocale: () => {},
})


export const TranslationProvider = ({ children }) => {
	const i18n = new I18n({
		'pt-BR': ptBr,
		'br': ptBr,
		'pt': ptBr,
		'us': enUs,
		'en': enUs,
		'es': es,
	})

	const { get } = useStorage()

	const [locale, setLocale] = useState(
		Localization.getLocales()[0].languageCode //pt, en, es
	)
	
	i18n.locale = locale

	useEffect(() => {
		const fetchDefaultIdiom = async () => {
			try {
				const { defaultIdiom } = await get('accountDetails')
				if (defaultIdiom) {
					i18n.locale = defaultIdiom?.isoCode
				} else {
					i18n.locale = locale
				}
			} catch(e){
				
			}
		}
		fetchDefaultIdiom()
	}, [locale])
	
	i18n.enableFallback = true

	return (
		<TranslationContext.Provider value={{ i18n, setLocale }}>
			{children}
		</TranslationContext.Provider>
	)
}
