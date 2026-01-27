import { useRef, useState } from 'react'
import { Image, ImageBackground, View } from 'react-native'
import BottomSheet, {
	BottomSheetView,
} from '@gorhom/bottom-sheet'

import BackgroundImage1 from '../../assets/images/welcome-background-1.gif'
import AppLogo from '../../assets/images/logo-travelcash.png'
import { ConciergeBottomSheet } from '../Home/components/concierge-bottom-sheet'

import styles from './styles'
import { Button, CustomText } from '../../components'
import { useTranslation } from '../../hooks'
import { LinearGradient } from 'expo-linear-gradient'

//Storage
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()


const Welcome = ({ navigation }) => {
	const [open, setOpen] = useState(false)
	const { translate } = useTranslation('welcomeScreen')

	const bottomSheetRef = useRef(null)
	const handleClosePress = () => bottomSheetRef.current.close()

	const BackgroundImage = BackgroundImage1
	
	return (
		<ImageBackground
			source={BackgroundImage}
			style={styles.backgroundImage}
		>
			<LinearGradient
				colors={['#000', '#0000']}
				start={{ x: 0, y: 0.7 }}
				end={{ x: 0, y: 0.5 }}
				style={styles.container}
			>
				<Image source={AppLogo} style={styles.appLogo} />

				<View style={styles.contentContainer}>
					<CustomText
						customStyle={styles.title}
						fontWeight="bold"
						type="display"
					>
						{translate('title')}
					</CustomText>
					<CustomText
						customStyle={styles.subTitle}
						fontWeight="normal"
						type="display"
					>
						{translate('supportText')}
					</CustomText>

					<View style={styles.buttonsWrapper}>
						<Button
							customStyle={{
								...styles.button,
								...styles.signUpButton,
							}}
							title={translate('buttonCreateAccount')}
							color="#191919"
							onPress={() =>
								navigation.navigate('SignUp')
							}
						/>
						<Button
							customStyle={{
								...styles.button,
								...styles.accountActivationButton,
							}}
							color="#191919"
							title={translate('buttonActivateAccount')}
							onPress={() =>
								navigation.navigate(
									'AccountActivation'
								)
							}
						/>
						<Button
							customStyle={{
								...styles.button,
								...styles.signInButton,
							}}
							color="#FFF"
							backgroundColor="#000"
							borderColor="#fff"
							title={translate('buttonSignIn')}
							onPress={() =>
								navigation.navigate('SignIn')
							}
						/>
						<View style={{height: 15}}/>
						<Button
							onPress={() => setOpen(true)}
							title={translate('help')}
							backgroundColor="transparent"
							color="#FFF"
							type={'Link'}
						/>
					</View>
				</View>
			</LinearGradient>
			<BottomSheet
				ref={bottomSheetRef}
				index={open ? 0 : -1}
				snapPoints={[750]}
				enablePanDownToClose={true}
				onClose={() => {
					setOpen(false)
				}}
			>
				<BottomSheetView style={{}}>
					<ConciergeBottomSheet
						navigation={navigation}
						onClose={() => {
							setOpen(false)
							handleClosePress()
						}}
					/>
				</BottomSheetView>
			</BottomSheet>
		</ImageBackground>
	)
}
export default Welcome