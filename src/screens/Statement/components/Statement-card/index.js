import React, { useState } from 'react'
import { View, Pressable } from 'react-native'
import { CustomText } from '../../../../components'
import { useTranslation } from '../../../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { styles } from './styles'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import ComponentModal from '../../../../components/modal'

export const StatementCard = ({
	cardBalance,
	cardBalanceDollar,
	walletBalance,
	walletBalanceDollar,
	accountDetails
}) => {
	const { translate } = useTranslation('statement')
	const [modalVisible, setModalVisible] = useState(false)
	const [message, setMessage] = useState({ message: '', title: '' })
	return (
		<View style={styles.container}>
			<View style={{flexDirection: 'row', justifyContent: "space-between"}}>
				<View>
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.balanceText}
					>
						{translate('balanceWallet')}
						{' '}
						<Pressable onPress={() => {
							setModalVisible(true)
							setMessage({ message: translate('balanceInformation'), title: translate('balanceInformationTitle') })

						}}>
							<FontAwesomeIcon
								icon={faCircleInfo}
								size={14}
								color="#19191966"
								style={styles.infoIcon}
							/>
						</Pressable>
					</CustomText>
					<CustomText
						fontWeight="bold"
						type="display"
						customStyle={styles.balanceValue}
					>
						{walletBalance}
					</CustomText>
					<CustomText fontWeight="bold" type="display" customStyle={styles.balanceDollarValue}>
						$ {walletBalanceDollar.toFixed(2)}
					</CustomText>
				</View>
				{
					!accountDetails.notshowtravelcard ? <View style={styles.divider} /> : null
				}
				{
					!accountDetails.notshowtravelcard ?

						<View>
							<CustomText
								fontWeight="normal"
								type="display"
								customStyle={styles.balanceText}
							>
								{translate('balanceCard')}
								{' '}
								<FontAwesomeIcon
									icon={faCircleInfo}
									size={14}
									color="#19191966"
									style={styles.infoIcon}
								/>
							</CustomText>
							<CustomText
								fontWeight="bold"
								type="display"
								customStyle={styles.balanceValue}
							>
								{cardBalance}
							</CustomText>
							<CustomText fontWeight="bold" type="display" customStyle={styles.balanceDollarValue}>
								$ {cardBalanceDollar.toFixed(2)}
							</CustomText>
						</View>
						: null
				}
			</View>
			<ComponentModal
				modalVisible={modalVisible}
				setModalVisible={() => {
					setModalVisible(!modalVisible)
					setMessage({ message: '', title: '' })
				}}
				message={message}
			/>
		</View>
	)
}
