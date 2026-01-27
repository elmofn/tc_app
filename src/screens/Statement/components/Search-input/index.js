import { TextInput, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { styles } from './styles'

export const SearchInput = ({
	placeholder,
	onChangeText,
}) => {
	return (
		<View style={styles.container}>
			<FontAwesomeIcon icon={faSearch} size={16} color='#707A81' />
			<TextInput
				placeholder={placeholder}
				onChangeText={onChangeText}
				style={styles.input}
			/>
		</View>
	)
}
