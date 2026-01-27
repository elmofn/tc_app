import react, { useState } from 'react'
import { Image, SafeAreaView, View } from 'react-native'
import { Button, CustomText, ScreenTitle } from '../../../../components'
import { styles } from './styles'
import { useTranslation } from '../../../../hooks'
import * as Clipboard from 'expo-clipboard';

import ComponentModal from '../../../../components/modal'

export const PixScreen = ({ navigation }) => {
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	const { translate } = useTranslation('depositPixScreen')

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync('48.895.840/0001-96');
		setMessage({ message: translate('CopyKey'), title: translate('Success') })
		setModalVisible(true)
	};

	return (
		<View style={styles.container}>
			<ScreenTitle
				title={translate('title')}
				navigation={navigation}
				showBackButton
			/>
			<View style={{height: 36}} /> 
			<CustomText
				fontWeight="normal"
				type="display"
				customStyle={styles.pixExpirationText}
			>
				{translate('CopyAndPaste')}
			</CustomText>
			<View style={styles.pixContainer}>
				<View style={{flexDirection: 'row', alignItems: "center"}} >
					<CustomText
						fontWeight="bold"
						type="display"
						customStyle={styles.pixKeyValue}
					>
						{translate('randomKey')} 48.895.840/0001-96
					</CustomText>
				</View>
				<View style={{flexDirection: 'row', alignItems: "center"}} >
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.pixKeyText}
					>
						Razão Social: FREEDOM TRAVEL TECNOLOGIA LTDA
					</CustomText>
				</View>
				<View style={{flexDirection: 'row', alignItems: "center"}} >
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.pixKeyText}
					>
						Banco Inter – Cód. 077 
						{'\n'}
						Ag.: 0001-9
						{'\n'}
						Cc: 26825886-4
					</CustomText>
				</View>
				<View style={{flexDirection: 'row', alignItems: "center"}} >
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.pixKeyText}
					>
						{translate('description')}
					</CustomText>
				</View>
				<View style={{height: 20}}/>
				
				<Button
					onPress={copyToClipboard}
					title={translate('copyKey')}
					borderColor="#04B2D4"
					color="#04B2D4"
					backgroundColor="#fff"
				/>
			</View>
			<ComponentModal
				modalVisible={modalVisible}
				setModalVisible={() => {
					setModalVisible(!modalVisible)
					setMessage({ message: '', title: '' })
				}}
				message={message}
			/>
		</View>
	)
}

export default PixScreen