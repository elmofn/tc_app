import { useCallback, useEffect, useRef, useState } from 'react'
import { styles } from './SelectWithFlag.styles'
import { Pressable, View } from 'react-native'
import { CustomText } from '../custom-text'
import CountryFlag from 'react-native-country-flag'
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetScrollView,
} from '@gorhom/bottom-sheet/'
import { Portal } from 'react-native-portalize'

export const SelectWithFlag = ({
	label,
	options,
	onChange,
	selectedOption
}) => {
	const [currentOption, setCurrentOption] = useState(
		selectedOption || options[0]
	)
	const [isVisible, setIsVisible] = useState(false)
	const bottomSheetRef = useRef(null)

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		),
		[]
	)

   const handleClosePress = () => bottomSheetRef.current.close()

	return (
		<>
			<View style={styles.inputContentContainer} >
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.label}
				>
					{label}
				</CustomText>
				<Pressable
					style={styles.inputContainer}
					onPress={() => setIsVisible(true)}
				>
					<CustomText fontWeight="normal" type="text">
						{currentOption?.label || 'Selecione uma opção'}
					</CustomText>
					<View style={styles.flagContainer}>
						{currentOption?.isoCode && (
							<CountryFlag
								isoCode={currentOption.isoCode}
								size={16}
								style={styles.flag}
							/>
						)}
						{
							<CustomText fontWeight="normal" type="text">
								{currentOption?.legend || ''}
							</CustomText>
						}
					</View>
				</Pressable>
			</View>
			<Portal>
				<BottomSheet
					ref={bottomSheetRef}
					index={isVisible ? 0 : -1}
					snapPoints={[400]}
					backdropComponent={renderBackdrop}
					enablePanDownToClose={true}
					onClose={() => {
						setIsVisible(false)
					}}
				>
					<BottomSheetScrollView
						contentContainerStyle={
							styles.bottomSheetContentContainer
						}
					>
						<FlagList
							options={options}
							onClose={(value) => {
								setCurrentOption(value)
								onChange(value)
								setIsVisible(false)
                        		handleClosePress()
							}}
						/>
					</BottomSheetScrollView>
				</BottomSheet>
			</Portal>
		</>
	)
}

const FlagList = ({ options, onClose }) => {
	return (
		<>
			{options.map((option, index) => {
				const { label, isoCode, legend } = option
				if (isoCode === '') return <View key={index.toString()}></View>
				return (
					<Pressable
						key={index.toString()}
						onPress={() => {
							onClose(option)
						}}
						style={styles.optionContainer}
					>
						<CountryFlag
							isoCode={isoCode}
							size={32}
							style={styles.flag}
						/>
						<CustomText fontWeight="normal" type="text">
							{legend}{' '}
						</CustomText>
						<CustomText fontWeight="normal" type="text">
							{label}{' '}
						</CustomText>
					</Pressable>
				)
			})}
		</>
	)
}
