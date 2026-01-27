import { useState } from 'react'
import { styles } from './styles'
import { Pressable, ScrollView, View, useWindowDimensions, Text } from 'react-native'
import { useTranslation } from '../../hooks'
import { Button } from '../button'
import { CustomText } from '../custom-text'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons/'
import Checkbox from 'expo-checkbox'
import BottomSheet, { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet'
import RenderHtml from 'react-native-render-html';


export const TermsBottomSheet = ({ accountDetails, submit, loading }) => {
	const [isChecked, setChecked] = useState(false)
	const { translate } = useTranslation('terms')
	const { close } = useBottomSheet()
	const { width } = useWindowDimensions();

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
				onPress={() => submit(accountDetails?.polices[0]?.contentId)}
				color="#fff"
				backgroundColor="#000"
				disabled={!isChecked || loading}
			/>
		</View>
	)
}
