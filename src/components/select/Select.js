import { View } from 'react-native'
import { CustomText } from '../custom-text'
import { Picker } from '@react-native-picker/picker'
import { styles } from './Select.styles'

export const Select = ({
	label,
	options,
	onValueChange,
	disabled,
	placeholder,
	selectedValue,
}) => {
	return (
		<View>
			<CustomText
				fontWeight="bold"
				type="display"
				customStyle={styles.label}
			>
				{label}
			</CustomText>
			<View style={styles.inputContainer}>
				<Picker
					selectedValue={selectedValue}
					onValueChange={onValueChange}
					enabled={!disabled}
					placeholder={placeholder}
				>
					{options.map((option) => (
						<Picker.Item
							key={option.value}
							label={option.label}
							value={option.value}
						/>
					))}
				</Picker>
			</View>
		</View>
	)
}
