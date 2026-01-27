import { Controller } from 'react-hook-form'
import { CustomTextInput } from './TextInput'

export const ControlledTextInput = ({
	control,
	label,
	keyboardType,
	secureTextEntry,
	placeholder,
	name,
	maskType,
	customStyle,
	required = true,
	autoCapitalize,
	autoFocus,
	maxLength
}) => {
	return (
		<Controller
			name={name}
			control={control}
			rules={{
				required
			}}
			render={({ field: { onChange, value } }) => (
				<CustomTextInput
					label={label}
					placeholder={placeholder}
					onChangeText={onChange}
					value={value}
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
					maskType={maskType}
					customStyle={customStyle}
					autoCapitalize={autoCapitalize}
					autoFocus={autoFocus}
					maxLength={maxLength}
				/>
			)}
		/>
	)
}
