import { View } from 'react-native'
import { styles } from './styles'

export const CurvedCard = ({ children, style }) => {
	return <View style={{ ...styles.card, ...style }}>{children}</View>
}
