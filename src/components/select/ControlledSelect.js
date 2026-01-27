import { Controller } from 'react-hook-form'
import { FC } from 'react'
import { Select } from './Select'

export const ControlledSelect = ({
	control,
	label,
	options,
	disabled,
	placeholder,
	name,
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<Select
					label={label}
					options={options}
					onValueChange={onChange}
					disabled={disabled}
					placeholder={placeholder}
					selectedValue={value}
				/>
			)}
		/>
	)
}
