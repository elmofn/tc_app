import { Text } from 'react-native'
import { styles } from './styles'
import {
	RedHatText_400Regular,
	RedHatText_500Medium,
} from '@expo-google-fonts/red-hat-text'
import { useFonts } from 'expo-font'
import { Ubuntu_400Regular, Ubuntu_500Medium } from '@expo-google-fonts/ubuntu'

export const CustomText = ({
	children,
	type,
	fontWeight,
	customStyle,
}) => {
	const [fontsLoaded, fontError] = useFonts({
		RedHatText_400Regular,
		RedHatText_500Medium,
		Ubuntu_400Regular,
		Ubuntu_500Medium,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<Text
			style={{
				...styles[type],
				fontWeight,
				...customStyle,
			}}
			//numberOfLines={3}
		>
			{children}
		</Text>
	)
}
