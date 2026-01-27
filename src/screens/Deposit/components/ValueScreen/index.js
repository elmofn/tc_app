import { useContext, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { Button, CustomText, CustomTextInput, ScreenTitle } from '../../../../components'
import { PaymentMethodCard } from '../PaymentMethodCard'
import { styles } from './styles'
import { useTranslation } from '../../../../hooks'
import { AccountContext } from '../../../../contexts'

const ValueScreen = ({ navigation }) => {
	const { translate } = useTranslation('depositValueScreen')
	const [value, setValue] = useState(0)
	const [method, setMethod] = useState()
	const { accountDetails } = useContext(AccountContext)

	const handleNavigation = () => {
		if (method === 'Pix') {
			navigation.navigate("Pix")
		} else {
			navigation.navigate("Cards")
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScreenTitle
				title={translate('title')}
				navigation={navigation}
				showBackButton
			/>
			<CustomText
				fontWeight="normal"
				type="display"
				customStyle={styles.title}
			>
				{translate('subtitle')}
			</CustomText>
			<View style={styles.valuesContainer}>
				<CustomText fontWeight="bold" type="display">
					{translate('accountBalance')}
				</CustomText>
				<CustomText fontWeight="normal" type="display">
					{`${accountDetails?.defaultCurrency.symbol} ${(
						(accountDetails?.accountBalance || 0) /
						(accountDetails?.defaultCurrency.currentExchangeRate ||
							0)
					).toFixed(2)} (U$${accountDetails?.accountBalance.toFixed(
						2
					)})`}
				</CustomText>
			</View>
			<CustomTextInput
				label={translate('inputLabelValue')}
				onChangeText={(inputValue) => setValue(parseFloat(inputValue))}
				keyboardType="decimal-pad"
				placeholder={translate('inputPlaceholderValue')}
			/>
			<View style={styles.valuesContainer}>
				<CustomText fontWeight="bold" type="display">
					{translate('dollarConversion')}
				</CustomText>
				<CustomText fontWeight="normal" type="display">
					U${' '}
					{(
						(value || 0) /
						(accountDetails?.defaultCurrency.currentExchangeRate ||
							0)
					).toFixed(2)}
				</CustomText>
			</View>
			<CustomText
				fontWeight="bold"
				type="display"
				customStyle={styles.paymentMethodsTitle}
			>
				{translate('payment')}
			</CustomText>
			<View style={styles.paymentMethodsContainer}>
				<PaymentMethodCard
					type="pix"
					isActive={method === "Pix"}
					onPress={() => setMethod("Pix")}
					title="Pix"
				/>
				<PaymentMethodCard
					type="card"
					isActive={method === "Credit"}
					onPress={() => setMethod("Credit")}
					title={translate('credit')}
				/>
				<PaymentMethodCard
					type="card"
					isActive={method === "Debit"}
					onPress={() => setMethod("Debit")}
					title={translate('debit')}
				/>
			</View>
			<Button
				onPress={handleNavigation}
				title={translate('buttonContinue')}
				backgroundColor="#000"
				color="#fff"
				disabled={value === 0 || !method}
				customStyle={styles.button}
			/>
		</SafeAreaView>
	)
}

export default ValueScreen