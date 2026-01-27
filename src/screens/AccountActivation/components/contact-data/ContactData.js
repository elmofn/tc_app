import React, { useContext, useEffect } from 'react'
import { Pressable, View, BackHandler } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useForm } from 'react-hook-form'
import { Button, ControlledTextInput, CustomText } from '../../../../components'
import { styles } from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../../../hooks'
import { AccountContext } from '../../../../contexts'

export const ContactData = ({ onGoBack, onSubmit, loading }) => {
	const navigation = useNavigation()

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		  	if (navigation.canGoBack()){
				onGoBack()
			} else {
				// Lógica para quando não há mais telas para voltar
				console.log('Não há mais telas para voltar.');
			}
		  	return true;
		});
	
		return () => backHandler.remove();
	}, [navigation]);

	const { translate } = useTranslation('contactDataScreen')

	const { accountDetails } = useContext(AccountContext)


	const { control, handleSubmit, formState } = useForm({
		defaultValues: {
			email: accountDetails?.email ,
			name: accountDetails?.name,
			phone: accountDetails?.phoneNumber,
		},
	})

	return (
		<View>
			<View style={styles.titleSection}>
				<Pressable
					style={styles.goBackCallToAction}
					onPress={() => onGoBack()}
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
					control={control}
				/>
				<ControlledTextInput
					name="phone"
					control={control}
					label={translate('inputLabelPhone')}
					keyboardType="phone-pad"
					maskType={'Phone'}
				/>
				<ControlledTextInput
					name="email"
					control={control}
					label={translate('inputLabelEmail')}
					keyboardType="email-address"
				/>
			</View>
			<Button
				onPress={handleSubmit((data) => {
					onSubmit(data)
				})}
				title={translate('buttonContinue')}
				backgroundColor="#000"
				color="#fff"
				disabled={!formState.isValid || loading}
			/>
		</View>
	)
}
