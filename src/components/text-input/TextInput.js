import { TextInput, View } from 'react-native'
import { CustomText } from '../custom-text'
import { styles } from './styles'
import { mask } from '../../utils'

export const CustomTextInput = ({
	label,
	onChangeText,
	value,
	keyboardType,
	secureTextEntry,
	placeholder,
	maskType,
	customStyle,
	autoCapitalize,
	autoFocus,
	maxLength
}) => {
	return (
		<View style={customStyle}>
			<CustomText
				fontWeight="bold"
				type="text"
				customStyle={styles.label}
			>
				{label}
			</CustomText>
			<TextInput
				style={styles.input}
				value={value}
				onChangeText={(text) => {
					if (maskType) {
						value = mask(text, maskType)
						onChangeText(mask(text, maskType))
						return
					}
					onChangeText(text)
				}}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCapitalize={autoCapitalize}
				autoFocus={autoFocus}
				maxLength={maxLength}
			/>
		</View>
	)
}
