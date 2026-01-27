import { useContext, useState } from 'react'
import { View } from 'react-native'
import { Button, ControlledTextInput } from '../../../../components'
import { styles } from './styles'
import { useForm } from 'react-hook-form'
import { AccountContext } from '../../../../contexts'
import { useTranslation } from '../../../../hooks'

import DeleteModal from '../../../../components/delete-modal'
import LogoutModal from '../../../../components/logout-modal'

import { StorageAdapter } from '../../../../utils'
const storage = new StorageAdapter()

const PersonalData = ({ navigation,	onSubmit, loading }) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [modalVisibleLogout, setModalVisibleLogout] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const { accountDetails, setAccountDetails } = useContext(AccountContext)
	const { translate } = useTranslation('profile')
	const { control, handleSubmit, formState, watch } = useForm({
		defaultValues: {
			name: accountDetails?.name || '',
			phone: accountDetails?.phoneNumber || '',
			email: accountDetails?.email || '',
		},
	})

	const handleLogout = () => {
		setModalVisibleLogout(false)
		setTimeout(() => {
			navigation.reset({
				index: 0,
				routes: [{ name: 'Welcome' }],
			}) 
			setAccountDetails(null)
			storage.remove('accountDetails')
			storage.remove('auth-token')
			storage.remove('saved-password')
			storage.remove('app-configs')
		}, 1000)
	}

	const email = watch('email');
	const isValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

	const name = watch('name');
	const isValidName = name && /^[a-zA-Z\sà-úÀ-Ú\d\-']{3,50}$/.test(name);

	const phone = watch('phone');

	return (
		<View style={styles.contentContainer}>
			<View style={styles.inputsContainer}>
				<ControlledTextInput
					name="name"
					label={translate('inputLabelName')}
					control={control}
				/>
				<ControlledTextInput
					name="phone"
					label={translate('inputLabelPhone')}
					control={control}
					//maskType={'Phone'}
					keyboardType="phone-pad"
					maxLength={13}
				/>
				<ControlledTextInput
					name="email"
					label={translate('inputLabelEmail')}
					control={control}
					keyboardType="email-address"
				/>
			</View>

			<Button
				onPress={handleSubmit((data) => {
					onSubmit(data)
				})}
				title={translate('buttonSave')}
				backgroundColor="#000"
				color="#fff"
				disabled={!formState.isValid || loading || !isValidEmail || !isValidName || phone.length < 13}
			/>	

			<Button
				onPress={() =>
					navigation.navigate(
						'UpdatePassword', { emailValue: accountDetails.email
					})
				}
				title={translate('linkChangePassword')}
				backgroundColor="#fff"
				color="#04B2D4"
				type={'Link'}
			/>

			<Button
				onPress={() => setModalVisibleLogout(true)}
				title={translate('logout')}
				backgroundColor="#fff"
				color="#04B2D4"
				type={'Link'}
			/>

			<Button
				onPress={() => setModalVisible(true)}
				title={translate('deleteAccount')}
				backgroundColor="#fff"
				color="red"
				type={'Link'}
			/>

			<DeleteModal
				modalVisible={modalVisible}
				setModalVisible={() => setModalVisible(!modalVisible)}
				exclude={() =>  {
					setModalVisible(false)
					navigation.navigate('Logout')
				}}
			/>
			<LogoutModal
				modalVisible={modalVisibleLogout}
				setModalVisible={() => {
					setModalVisibleLogout(!modalVisibleLogout)
				}}
				Yes={() =>  handleLogout() }
				No={() => setModalVisibleLogout(false)}
			/>
		</View>
	)
}


export default PersonalData
