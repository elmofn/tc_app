import { FC, useState } from 'react'
import { SafeAreaView, Switch, View } from 'react-native'
import {
	Button,
	ControlledTextInput,
	CustomText,
	ScreenTitle,
	ControlledSelect,
} from '../../../../components'

import { FieldValues, useForm } from 'react-hook-form'
import { styles } from './styles'
import { MaskType } from '../../../../utils'
import { useTranslation } from '../../../../hooks'

const CardsScreen = ({ navigation }) => {
	const { translate } = useTranslation('depositCardsScreen')
	const { control, handleSubmit, formState } = useForm<FieldValues>({
		defaultValues: {
			name: '',
			cardNumber: '',
			expirationDate: '',
			cvv: '',
			paymentConditions: '',
		},
	})

	const [reuseCard, setReuseCard] = useState<boolean>(false)

	const paymentConditions = [
		{
			label: 'À vista',
			value: '1',
		},
		{
			label: 'Parcelado',
			value: '2',
		},
	]

	const handleSubmitForm = (data) => {
		console.log(data)
		console.log(reuseCard)
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
			<ControlledTextInput
				label={translate('inputLabelName')}
				placeholder={translate('inputPlaceholderName')}
				control={control}
				name="name"
			/>
			<ControlledTextInput
				label={translate('inputLabelCardNumber')}
				placeholder={translate('inputPlaceholderCardNumber')}
				keyboardType="numeric"
				control={control}
				name="cardNumber"
				maskType={MaskType.CreditCardNumber}
			/>
			<View style={styles.inputsContainer}>
				<ControlledTextInput
					label={translate('inputLabelExpirationDate')}
					placeholder={translate('inputPlaceholderExpirationDate')}
					keyboardType="numeric"
					control={control}
					name="expirationDate"
					maskType={MaskType.Date}
					customStyle={styles.customLengthInput}
				/>
				<ControlledTextInput
					label={translate('inputLabelCVV')}
					placeholder={translate('inputPlaceholderCVV')}
					keyboardType="numeric"
					control={control}
					name="cvv"
					maskType={MaskType.CVV}
					customStyle={styles.customLengthInput}
				/>
			</View>
			<ControlledSelect
				control={control}
				name="paymentConditions"
				label={translate('inputLabelPaymentConditions')}
				options={paymentConditions}
			/>
			<View style={styles.inputsContainer}>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.reuseCard}
				>
					{translate('inputLabelSaveThisCard')}
				</CustomText>
				<Switch
					onValueChange={(value) => setReuseCard(value)}
					value={reuseCard}
				/>
			</View>
			<Button
				onPress={handleSubmit((data) => {
					handleSubmitForm(data)
				})}
				disabled={!formState.isValid}
				title={translate('buttonContinue')}
				backgroundColor="#000"
				color="#fff"
			/>
		</SafeAreaView>
	)
}

export default CardsScreen