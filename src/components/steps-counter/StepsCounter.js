import { View } from 'react-native'

import { stepperStyles, styles } from './styles'
import { CustomText } from '../custom-text'
import { SafeAreaView } from 'react-native-safe-area-context'

export const StepsCounter = ({
	currentStep,
	stepsLength,
}) => {
	return (
		<SafeAreaView>
			<CustomText
				type="text"
				fontWeight="normal"
				customStyle={styles.StepperCounter}
			>
				{currentStep}/{stepsLength.length}
			</CustomText>
			<View style={styles.StepperContainer}>
				{(stepsLength)
					.fill(0)
					.map((step, index) => {
						const isActive = currentStep >= index + 1 
						return (
							<View
								key={index}
								style={stepperStyles(isActive).StepperItem}
							>
								
							</View>
						)
					})}
			</View>
		</SafeAreaView>
	)
}
