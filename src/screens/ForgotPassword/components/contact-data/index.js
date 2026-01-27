import { Pressable, View } from 'react-native'
import { useForm } from 'react-hook-form'
import { Button, ControlledTextInput, CustomText } from '../../../../components'
import { styles } from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../../../hooks'


export const ContactData = ({ onSubmit, loading, navigation }) => {
	const { translate } = useTranslation('contactDataScreen')

	const { control, handleSubmit, formState, watch } = useForm({
		defaultValues: {
			email: '',
			name: '',
			phone: '',
		},
	})

	const email = watch('email');
	const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const name = watch('name');
	const isValidName = name && /^[a-zA-Z\sà-úÀ-Ú\d\-']{3,50}$/.test(name);

	const phone = watch('phone');

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
				<ControlledTextInput
					name="phone"
					control={control}
					label={translate('inputLabelPhone')}
					placeholder={translate('inputPlaceholderPhone')}
					keyboardType="phone-pad"
					maskType={'Phone'}
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
					onSubmit(data)
				})}
				title={translate('buttonContinue')}
				backgroundColor="#000"
				color="#fff"
				disabled={!formState.isValid || loading || !isValidEmail || !isValidName || phone.length < 14}
			/>
		</View>
	)
}
