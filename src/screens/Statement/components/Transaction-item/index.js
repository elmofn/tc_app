import { View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
	faArrowDown,
	faArrowUp,
	faCircleInfo,
	faRotate,
} from '@fortawesome/free-solid-svg-icons'
import { CustomText } from '../../../../components'
import { iconStyles, styles } from './styles'
import { formatDate } from '../../../../utils'

export const TransactionItem = ({
	title,
	value,
	valueDollar,
	date,
	type,
	description,
	originCurrencyId
}) => {

	const typeTransaction = {
		0: "debit",
		1: "credit"
	}

	function getIcon(type) {
		if (type ===  "credit") {
			return faArrowDown
		} else if (type === "debit") {
			return faArrowUp
		} else {
			return faRotate
		}
	}

	return (
		<View style={styles.container}>
			<View style={iconStyles(typeTransaction[type]).icon}>
				<FontAwesomeIcon icon={(getIcon(typeTransaction[type]))} color="#fff" />
			</View>
			<View style={styles.containerTitle}>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.title}
				>
					{title}
					{' '}
					{/* <FontAwesomeIcon
						icon={faCircleInfo}
						size={14}
						color="#19191966"
						style={styles.infoIcon}
					/> */}
				</CustomText>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.description}
				>
					{description}
				</CustomText>
			</View>
			<View style={styles.balanceContainer}>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.date}
				>
					{formatDate(new Date(date))}
				</CustomText>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.balance}
				>
					 {originCurrencyId}{' '}{valueDollar.toFixed(2)}
				</CustomText>
				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.balanceDollar}
				>
					($ {value.toFixed(2)})
				</CustomText>
			</View>
		</View>
	)
}
