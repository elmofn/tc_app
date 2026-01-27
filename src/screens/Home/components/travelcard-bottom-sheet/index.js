import { useState } from 'react'
import { styles } from './styles'
import { Pressable, ScrollView, View } from 'react-native'
import { Button, CustomText } from '../../../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons/'
import Checkbox from 'expo-checkbox'
import { useBottomSheet } from '@gorhom/bottom-sheet'

export const TravelCardBottomSheet = ({ navigation }) => {
	const [isChecked, setChecked] = useState(false)
	const { close } = useBottomSheet()

	const handleSubmit = () => {
		close()
		navigation.navigate('TravelCardActivatio')
	}

	return (
		<View style={styles.contentContainer}>
			<View style={styles.header}>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.title}
				>
					Termos e condições do TravelCard
				</CustomText>
				<Pressable
					onPress={() => {
						close()
					}}
				>
					<FontAwesomeIcon icon={faX} />
				</Pressable>
			</View>
			<ScrollView style={styles.termsAndConditionsContainer}>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.termsAndConditionsText}
				>
					&quot;Lorem ipsum dolor sit amet, consectetur adipiscing
					elit, sed do eiusmod tempor incididunt ut labore et dolore
					magna aliqua. Ut enim ad minim veniam, quis nostrud
					exercitation ullamco laboris nisi ut aliquip ex ea commodo
					consequat. Duis aute irure dolor in reprehenderit in
					voluptate velit esse cillum dolore eu fugiat nulla pariatur.
					Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum.&quot;
				</CustomText>
			</ScrollView>
			<View style={styles.inputContainer}>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.inputText}
				>
					Eu concordo com os Termos e Condições de Uso do TravelCard.
				</CustomText>
				<Checkbox
					value={isChecked}
					onValueChange={setChecked}
					color={isChecked ? '#4630EB' : undefined}
				/>
			</View>
			<Button
				title="Continuar"
				onPress={handleSubmit}
				color="#fff"
				backgroundColor="#000"
				disabled={!isChecked}
			/>
		</View>
	)
}
