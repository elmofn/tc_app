import React, { useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useState } from 'react'
import { Button, CustomText } from '../../../../components'
import { styles } from './styles'
import { colors } from '../../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../../../hooks'


const CELL_COUNT = 6

export const AuthCode = ({ onContinue, navigation, loading }) => {
	const [value, setValue] = useState('')
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value,
		setValue,
	})
	const { translate } = useTranslation('codeActivationScreen')

	return (
		<>
			<View style={styles.titleSection}>
				<Pressable
					style={styles.goBackCallToAction}
					onPress={() => {
						navigation.goBack()
					}}
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</Pressable>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.title}
				>
					{translate('title')}
				</CustomText>
			</View>
			<CustomText
				fontWeight="normal"
				type="display"
				customStyle={styles.subTitle}
			>
				{translate('description')}
			</CustomText>

			<CodeField
				ref={ref}
				{...props}
				value={value}
				onChangeText={setValue}
				cellCount={CELL_COUNT}
				keyboardType="alphanumeric"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<Text
						key={index}
						style={[styles.cell, isFocused && styles.focusCell]}
						onLayout={getCellOnLayoutHandler(index)}
					>
						{symbol || (isFocused ? <Cursor /> : null)}
					</Text>
				)}
			/>

			<Button
				title={translate('buttonContinue')}
				onPress={() => onContinue(value)}
				backgroundColor={
					value.toString().length === 6
						? '#000'
						: colors.callToActionGrey
				}
				color="#fff"
				customStyle={styles.button}
				disabled={value.toString().length !== 6 || loading}
			></Button>
		</>
	)
}
