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
	maxLength,
	renderLeftAccessory, // <-- Prop recebida
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

			{/* O 'styles.input' antigo agora é este 'styles.inputContainer' */}
			<View style={styles.inputContainer}>
				
				{/* Renderiza o acessório (o DDI) se ele existir */}
				{renderLeftAccessory && renderLeftAccessory()}

				{/* O TextInput agora usa um novo estilo 'textInput' */}
				<TextInput
					style={styles.textInput} // <-- Usa o novo estilo flexível
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
					placeholderTextColor="#707A81" // Boa prática
				/>
			</View>
		</View>
	)
}