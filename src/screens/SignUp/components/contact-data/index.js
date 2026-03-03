import { Pressable, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { Button, ControlledTextInput, CustomText } from '../../../../components'
import { styles } from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../../../hooks'

// NOVO: Imports necessários
import { useState } from 'react'
import CountryPicker from 'react-native-country-picker-modal'

export const ContactData = ({ onSubmit, loading, navigation }) => {
	const { translate } = useTranslation('contactDataScreen')

	// NOVO: Estado para o seletor de país
	const [countryCode, setCountryCode] = useState('BR') // Padrão Brasil
	const [callingCode, setCallingCode] = useState('+55') // Padrão DDI Brasil

	const { control, handleSubmit, formState, watch } = useForm({
		defaultValues: {
			email: '',
			name: '',
			phone: '', // Começa vazio
		},
	})

	const email = watch('email');
	const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const name = watch('name');
	const isValidName = name && /^[a-zA-Z\sà-úÀ-Ú\d\-']{3,50}$/.test(name);

	// 'phone' agora é SÓ o número local (DDD + 9xxxx)
	const phone = watch('phone'); 

	// NOVO: Função para quando o usuário seleciona um país
	const onSelectCountry = (country) => {
		setCountryCode(country.cca2)
		setCallingCode(`+${country.callingCode[0]}`)
	}

	// NOVO: Função que renderiza o acessório (o seletor de país)
	const renderCountryPickerAccessory = () => (
		<CountryPicker
			withFlag
			withCallingCodeButton // <-- Isso mostra o DDI (ex: "+55") no botão
			countryCode={countryCode} // País selecionado
			onSelect={onSelectCountry} // O que fazer ao selecionar
			containerButtonStyle={styles.countryPickerButton} // Estilo para o botão
		/>
	)

	return (
		<View>
			<View style={styles.titleSection}>
				<Pressable
					style={styles.goBackCallToAction}
					onPress={() => {
						navigation.goBack()
					}}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Pressable>
				<CustomText
					type="display"
					fontWeight="bold"
					customStyle={styles.title}
				>
					{translate('title')}
				</CustomText>
			</View>
			<CustomText
				type="display"
				fontWeight="normal"
				customStyle={styles.subTitle}
			>
				{translate('description')}
			</CustomText>
			<View style={styles.inputContainer}>
				<ControlledTextInput
					name="name"
					label={translate('inputLabelName')}
					placeholder={translate('inputPlaceholderName')}
					control={control}
				/>

				{/* ALTERADO: Input de telefone agora usa a nova prop */}
				<ControlledTextInput
					name="phone"
					control={control}
					label={translate('inputLabelPhone')}
					placeholder={translate('inputPlaceholderPhone')}
					keyboardType="phone-pad" // <-- Isso ativa o filtro de números
					renderLeftAccessory={renderCountryPickerAccessory} 
				/>

				<ControlledTextInput
					name="email"
					control={control}
					label={translate('inputLabelEmail')}
					placeholder={translate('inputPlaceholderEmail')}
					keyboardType="email-address"
					autoCapitalize='none'
				/>
			</View>
			<Button
				onPress={handleSubmit((data) => {
					// ALTERADO: Combina o DDI + telefone antes de enviar
					const fullPhone = `${callingCode}${data.phone}`
					onSubmit({ ...data, phone: fullPhone })
				})}
				title={translate('buttonContinue')}
				backgroundColor="#000"
				color="#fff"
				// ALTERADO: Validação ajustada (10 dígitos para DDD + Fixo/Celular)
				disabled={
					!formState.isValid || 
					loading || 
					!isValidEmail || 
					!isValidName || 
					phone.length < 10 
				}
			/>
		</View>
	)
}