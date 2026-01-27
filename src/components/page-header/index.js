import { Pressable, Text, View } from 'react-native'
import styles from './styles'

export const PageHeader = ({ onGoBackClick, title }) => {
	return (<View style={styles.header}>
		<Pressable onPress={onGoBackClick}>
			<Text style={styles.headerTitle}>{title}</Text>
		</Pressable>
	</View>)
}