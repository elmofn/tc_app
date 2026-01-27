import React, { useEffect } from 'react'
import { Pressable, Text, View, BackHandler } from 'react-native'
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { useState } from 'react'
import { Button, CustomText } from '../../../../components'
import { Timer } from './components/Timer'
import { styles } from './styles'
import { colors } from '../../../../styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from '../../../../hooks'

//helpers
import { HelpersAccount } from '../../../../helpers'
const helpersAccount = new HelpersAccount()

const CELL_COUNT = 6

export const AuthCode = ({
	onContinue,
	loading,
	navigation,
	onGoBack,
	sendNewCode
}) => {
	const [value, setValue] = useState('')
	const [isTimerRunning, setIsTimerRunning] = useState(true);
	const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({value,	setValue})

	useEffect(() => {
		const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
		  	if (navigation.canGoBack()){
				onGoBack()
			} else {
				// Lógica para quando não há mais telas para voltar
				console.log('Não há mais telas para voltar.');
			}
		  	return true;
		});
	
		return () => backHandler.remove();
	}, [navigation]);

	const { translate } = useTranslation('codeValidationScreen')

	return (
		<>
			<View style={styles.titleSection}>
				<Pressable
					style={styles.goBackCallToAction}
					onPress={() => onGoBack()}
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
				keyboardType="number-pad"
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
			/>
			{	
				isTimerRunning ? 
				<>
					<View style={{height: 20}} />
					<Text style={{paddingTop: 10}}>
						{translate("expireTime")}:  <Timer 
							minutes={15} 
							isTimerRunning={isTimerRunning} 
							setIsTimerRunning={() => setIsTimerRunning(false)}
						/>
					</Text> 
				</>
				: 
				<>
					<View style={{height: 20}} />
					<Button
						onPress={() => {
							sendNewCode();
							setIsTimerRunning(true)
						}}
						title={translate('resendCode')}
						backgroundColor="transparent"
						color="#04B2D4"
						type={'Link'}
					/>
				</>
				
			}
		</>
	)
}
