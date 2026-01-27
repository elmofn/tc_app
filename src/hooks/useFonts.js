import {
	Ubuntu_300Light,
	Ubuntu_300Light_Italic,
	Ubuntu_400Regular,
	Ubuntu_400Regular_Italic,
	Ubuntu_500Medium,
	Ubuntu_500Medium_Italic,
	Ubuntu_700Bold,
	Ubuntu_700Bold_Italic,
} from '@expo-google-fonts/ubuntu'

import {
	RedHatText_300Light,
	RedHatText_300Light_Italic,
	RedHatText_400Regular,
	RedHatText_400Regular_Italic,
	RedHatText_500Medium,
	RedHatText_500Medium_Italic,
	RedHatText_600SemiBold,
	RedHatText_600SemiBold_Italic,
	RedHatText_700Bold,
	RedHatText_700Bold_Italic,
} from '@expo-google-fonts/red-hat-text'

import { useFonts as useExpoFonts } from 'expo-font'

export const useFonts = () => {
	const [fontsLoaded] = useExpoFonts({
		Ubuntu: Ubuntu_400Regular,
		Ubuntu_700: Ubuntu_700Bold,
		
		Ubuntu_300Light,
		Ubuntu_300Light_Italic,
		Ubuntu_400Regular,
		Ubuntu_400Regular_Italic,
		Ubuntu_500Medium,
		Ubuntu_500Medium_Italic,
		Ubuntu_700Bold,
		Ubuntu_700Bold_Italic,

		'Red Hat Text': RedHatText_400Regular,
		RedHatText_300Light,
		RedHatText_300Light_Italic,
		RedHatText_400Regular,
		RedHatText_400Regular_Italic,
		RedHatText_500Medium,
		RedHatText_500Medium_Italic,
		RedHatText_600SemiBold,
		RedHatText_600SemiBold_Italic,
		RedHatText_700Bold,
		RedHatText_700Bold_Italic,
	})

	return { areFontsLoaded: fontsLoaded }
}