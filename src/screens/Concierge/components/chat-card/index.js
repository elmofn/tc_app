import { FC } from 'react'
import { View } from 'react-native'
import { CustomText } from '../../../../components'
import { styles } from './styles'

export const ChatCard = ({ message, time, type }) => {
	return (
		<View style={styles({ type }).container}>
			<View style={styles({ type }).triangle} />
			<View style={styles({ type }).messageContainer}>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles({ type }).message}
				>
					{message}
				</CustomText>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles({ type }).time}
				>
					{time.getHours() + ':' + time.getMinutes()}
				</CustomText>
			</View>
		</View>
	)
}
