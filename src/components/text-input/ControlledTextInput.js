import { Controller } from 'react-hook-form'
import { CustomTextInput } from './TextInput' // Certifique-se que o path para CustomTextInput está correto

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
	maxLength,
	renderLeftAccessory,
}) => {
	
	// NOVO: Handler para filtrar o input
	const handleOnChange = (text, onChange) => {
		// Se for phone-pad, força a ser apenas numérico
		if (keyboardType === 'phone-pad') {
			const numericText = text.replace(/[^0-9]/g, ''); // Remove tudo que não for 0-9
			onChange(numericText);
		} else {
			// Caso contrário, age normalmente
			onChange(text);
		}
	}

	return (
		<Controller
			name={name}
			control={control} // <-- { FALTANTE ADICIONADO AQUI }
			rules={{
				required
			}}
			// ALTERADO: Tivemos que desestruturar 'onChange' aqui para usá-lo no handler
			render={({ field: { onChange, value } }) => ( 
				<CustomTextInput
					label={label}
					placeholder={placeholder}
					onChangeText={(text) => handleOnChange(text, onChange)} // ALTERADO: Usa o novo handler
					value={value}
					keyboardType={keyboardType}
					secureTextEntry={secureTextEntry}
					maskType={maskType}
					customStyle={customStyle}
					autoCapitalize={autoCapitalize}
					autoFocus={autoFocus}
					maxLength={maxLength}
					renderLeftAccessory={renderLeftAccessory}
				/>
			)}
		/>
	)
}