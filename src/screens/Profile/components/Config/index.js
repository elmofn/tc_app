import { useContext, useEffect, useMemo, useState } from 'react'
import { Switch, View } from 'react-native'
import { CustomText, SelectWithFlag } from '../../../../components'
import { styles } from './styles'
import { getISOByParam } from '../../../../utils'
import { useTranslation } from '../../../../hooks'
import { AccountContext, TranslationContext } from '../../../../contexts'

import { HelpersCurrencies } from '../../../../helpers'
const helpersCurrencies = new HelpersCurrencies()


const Config = ({ navigation, onSubmit, loading }) => {
	const idiomOptions = [
		{
			label: 'Português(Brasil)',
			isoCode: 'br',
			value: 'pt',
			legend: 'BRL',
			idiom: 'pt-BR',
			countryId: "69518C70-D652-4408-9C69-C2858C83264C"
		},
		{
			label: 'English',
			isoCode: 'us',
			value: 'en',
			legend: 'USA',
			idiom: 'en-US',
			countryId: "71A5E1A1-18EB-4E4A-9B7F-11C5BF8C4BB0"
		},
		{
			label: 'Spanish',
			isoCode: 'es',
			value: 'es',
			legend: 'ESP',
			idiom: 'es-ES',
			countryId: "F4B3DB4D-68D2-42A6-BE2E-4D3BBE9FABB3"
		}
	]
	const { translate } = useTranslation('profile')
	const { setLocale } = useContext(TranslationContext)
	const { accountDetails, setAccountDetails } = useContext(AccountContext)
	const [notifications, setNotifications] = useState({
		notificationByEmail: false,
		notificationByPhone: false,
		notificationByPush: false,
		notificationByWhatsapp: false
	})
	const [currencyList, setCurrencyList] = useState([])

	useEffect(() => {
		if (accountDetails?.notifications) {
			setNotifications({
				...accountDetails?.notifications,
			})
		}
	}, [])

	useEffect(() => {
		const fetchCurrencies = async () => {
			const result = await helpersCurrencies.GetCurrency()
			setCurrencyList(result.currencies)
		}
		fetchCurrencies()
	}, [])

	const handleCurrencyChange = (currency) => {
		if (accountDetails) {
			const selected = currencyList.find((c) => c.code === currency.value)
			if (selected) {
				setAccountDetails({
					...accountDetails,
					defaultCurrency: selected,
				})
				onSubmit({
					accountId: accountDetails.accountId,
					defaultCurrencyId: selected.id,
					defaultCountryId: null,
					notificationByEmail: null,
					notificationByPhone: null,
					notificationByPush: null,
					defaultChannel: null
				})
			}
		}
	}

	const handleIdiomChange = (idiom) => {
		setLocale(idiom.value)
		if (accountDetails) {
			setAccountDetails({
				...accountDetails,
				defaultIdiom: idiom.idiom,
			})
			onSubmit({
				accountId: accountDetails.accountId,
				defaultCurrencyId: null,
				defaultCountryId: idiom.countryId,
				notificationByEmail: null,
				notificationByPhone: null,
				notificationByPush: null,
				defaultChannel: null
			})
		}
	}

	const handleNotification = (values) => {
		setNotifications(values)
		if (accountDetails) {
			setAccountDetails({
				...accountDetails,
				notifications: values,
			})
			onSubmit({
				...values,
				accountId: accountDetails.accountId,
				defaultCurrencyId: null,
				defaultCountryId: null,
				defaultChannel: null
			})

		}
	}

	const inicitalCurrency = useMemo(() => {
		if (accountDetails?.defaultCurrency) {
			return {
				label: accountDetails.defaultCurrency.name,
				isoCode: getISOByParam('currency', accountDetails.defaultCurrency.code),
				value: accountDetails.defaultCurrency.code,
				legend: accountDetails.defaultCurrency.code,
			}
		}
		return {}
	}, [])

	const initialIdiom = useMemo(() => {
		if (accountDetails?.defaultIdiom) {
			return idiomOptions.find((element) => {
				return (element.idiom == accountDetails.defaultIdiom)
			})
		}
		return {}

	}, [])

	return (
		<View style={styles.contentContainer}>
			<SelectWithFlag
				onChange={(selectedOption) => {
					handleCurrencyChange(selectedOption)
				}}
				label={translate('inputLabelCurrency')}
				options={currencyList.map((currency) => {
					return {
						label: currency.name,
						isoCode: getISOByParam('currency', currency.code),
						value: currency.code,
						legend: currency.code,
						key: currency.id
					}
				})}
				selectedOption={inicitalCurrency}
			/>
			<SelectWithFlag
				onChange={(selectedOption) => {
					handleIdiomChange(selectedOption)
				}}
				label={translate('inputLabelIdiom')}
				options={idiomOptions}
				selectedOption={initialIdiom}
			/>
			<View style={styles.inputsContainer}>
				<CustomText fontWeight="bold" type="display">
					{translate('inputLabelEmailNotifications')}
				</CustomText>
				<Switch
					onChange={() => {
						handleNotification({
							...notifications,
							notificationByEmail: !notifications.notificationByEmail,
						})
					}}
					value={notifications.notificationByEmail}
				/>
			</View>
			<View style={styles.inputsContainer}>
				<CustomText fontWeight="bold" type="display">
					{translate('inputLabelSMSNotifications')}
				</CustomText>
				<Switch
					onChange={() => {
						handleNotification({
							...notifications,
							notificationByPhone: !notifications.notificationByPhone,
						})
					}}
					value={notifications.notificationByPhone}
				/>
			</View>
			<View style={styles.inputsContainer}>
				<CustomText fontWeight="bold" type="display">
					{translate('inputLabelPushNotifications')}
				</CustomText>
				<Switch
					value={notifications.notificationByPush}
					onChange={() => {
						handleNotification({
							...notifications,
							notificationByPush: !notifications.notificationByPush,
						})
					}}
				/>
			</View>
			<View style={styles.inputsContainer}>
				<CustomText fontWeight="bold" type="display">
					{translate('inputLabelWhatsAppNotifications')}
				</CustomText>
				<Switch
					value={notifications.notificationByWhatsapp}
					onChange={() => {
						handleNotification({
							...notifications,
							notificationByWhatsapp: !notifications.notificationByWhatsapp,
						})
					}}
				/>
			</View>
		</View>
	)
}


export default Config
