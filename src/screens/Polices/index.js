import { useState, useContext } from 'react'
import { styles } from './styles'
import { ScrollView, View, useWindowDimensions } from 'react-native'
import { useTranslation } from '../../hooks'
import { Button } from '../../components/button'
import { CustomText } from '../../components/custom-text'
import { AccountContext } from '../../contexts'

import Checkbox from 'expo-checkbox'
import RenderHtml from 'react-native-render-html';
//helpers
import { HelpersContent } from '../../helpers'
const helpersContent = new HelpersContent()

const Polices = ({ navigation, route }) => {
	const screen = route.params?.screen;
	const [isChecked, setChecked] = useState(false)
	const { translate } = useTranslation('terms')
	const [loading, setLoading] = useState(false)

	const { accountDetails } = useContext(AccountContext)

	const { width } = useWindowDimensions();

	//Confirmação de leitura 
	const confirmRead = async (contentId) => {
		try {
			setLoading(true)
			await helpersContent.ConfirmRead({
				confirmationId: "00000000-0000-0000-0000-000000000000",
				"contentId": contentId,
				"accountId": accountDetails.accountId,
				"confirmationDate": new Date()
			})

			navigation.reset({
				index: 0,
				routes: [{ name: screen }],
			})
		} catch (error) {
			setModalVisible(true)
			setMessage({ message: (translate('ivalidPassword')), title: translate('error') })
		} finally {
			setLoading(false)
		}
	}

	const RenderTerms = ({ children }) => {
		return (
			<ScrollView style={styles.termsAndConditionsContainer}>
				{children}
			</ScrollView>
		)
	}

	return (
		<View style={styles.contentContainer}>
			<View style={styles.header}>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.title}
				>
					{translate("title")}
				</CustomText>
			</View>

			<RenderTerms>
				<RenderHtml
					contentWidth={width}
					source={{ html: `${accountDetails?.polices ? accountDetails?.polices[0]?.richText : ""}` }}
				/>
			</RenderTerms>


			<View style={styles.inputContainer}>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.inputText}
				>
					{translate("acept")}
				</CustomText>
				<Checkbox
					value={isChecked}
					onValueChange={setChecked}
					color={isChecked ? 'black' : undefined}
				/>
			</View>
			<Button
				title={translate("continue")}
				onPress={() => confirmRead(accountDetails?.polices[0]?.contentId)}
				color="#fff"
				backgroundColor="#000"
				disabled={!isChecked || loading}
			/>
		</View>
	)
}

export default Polices