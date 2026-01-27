import React, {useRef} from 'react'
import { Image, ScrollView, View, Text } from 'react-native'
import {
	Button,
	CashbackBottomSheet,
	CashbackCard,
	CurvedCard,
	CustomText,
	HighlightedCashbacks,
	ScreenTitle,
} from '../../../../components'
import { useFocusEffect } from '@react-navigation/native';
import ibisLogo from '../../../../assets/images/mocks/ibis-logo-mock.png'
import TravelCard from '../../../../assets/images/travelcard.png'
import Concierge from '../../../../assets/images/concierge.png'
import { styles } from './styles'
import { LinearGradient } from 'expo-linear-gradient'
import { useContext, useState } from 'react'
import { BottomNavigationContext } from '../../../../contexts'
import { useTranslation } from '../../../../hooks'

import BottomSheet, {
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { ConciergeBottomSheet } from '../../../Home/components/concierge-bottom-sheet'

const TravelShopHome = ({ navigation }) => {
	const { translate } = useTranslation('travelShopScreen')
	const [showCashBackBottomSheet, setShowCashBackBottomSheet] = useState(false)
	const cashbacksMock = {
		highlights: [
			{
				cashbackPercentage: 10,
				logoUrl: ibisLogo.uri,
				rating: 4.2,
				ratingCount: 100,
				title: 'Ibis Hotel',
			},
			{
				cashbackPercentage: 10,
				logoUrl: ibisLogo.uri,
				rating: 4.2,
				ratingCount: 100,
				title: 'Ibis Hotel',
			},
			{
				cashbackPercentage: 10,
				logoUrl: ibisLogo.uri,
				rating: 4.2,
				ratingCount: 100,
				title: 'Ibis Hotel',
			},
			{
				cashbackPercentage: 10,
				logoUrl: ibisLogo.uri,
				rating: 4.2,
				ratingCount: 100,
				title: 'Ibis Hotel',
			},
		],
		setShowBottomSheet: function (show) {
			setShowCashBackBottomSheet(show)
		},
	}

	const { setShow } = useContext(BottomNavigationContext)
	const bottomSheetRef = useRef(null)
	const [open, setOpen] = useState(false)

	useFocusEffect(
		React.useCallback(() => {
			// Esta função é chamada quando a tela ganha foco
			//setShow(false);
			//setOpen(true)

			// Retorna uma função de limpeza se necessário
			return () => {
				// Qualquer lógica de limpeza que você queira executar quando a tela perder o foco
				// Se você quiser definir setShow(false) ao sair, você pode fazê-lo aqui
				setShow(true);
			};
		}, []) // Dependências vazias garantem que o efeito execute apenas quando a tela ganha foco
	);

	const handleClosePress = () => bottomSheetRef.current.close()

	return (
		<>
			<ScrollView style={styles.contentContainer}>
				<ScreenTitle title="TravelShop" navigation={navigation} showBackButton/>
				<CustomText
					fontWeight="normal"
					type="display"
					customStyle={styles.subText}
				>
					{translate("subTitle")}
				</CustomText>
				{/* <ScrollView
					horizontal={true}
					contentContainerStyle={styles.cashbackCardContainer}
				>
					<CashbackCard
						setShowBottomSheet={setShowCashBackBottomSheet}
					/>
					<CashbackCard
						setShowBottomSheet={setShowCashBackBottomSheet}
					/>
					<CashbackCard
						setShowBottomSheet={setShowCashBackBottomSheet}
					/>
					<CashbackCard
						setShowBottomSheet={setShowCashBackBottomSheet}
					/>
				</ScrollView> */}
{/* 
				<HighlightedCashbacks
					highlights={cashbacksMock.highlights}
					setShowBottomSheet={setShowCashBackBottomSheet}
				/> */}

				{/* <CurvedCard style={styles.curvedCard}>
					<LinearGradient
						colors={[
							'rgba(4, 178, 212, 1)',
							'rgba(4, 171, 203, 1)',
						]}
						start={[0, 0]}
						end={[1, 1]}
						style={styles.cardTravelCardBackgroundGradient}
					/>

					<View style={styles.curvedCardTextContainer}>
						<CustomText
							fontWeight="bold"
							type="display"
							customStyle={styles.curvedCardTitle}
						>
							Utilize o TravelCard para obter os melhores
							cashbacks!
						</CustomText>
						<CustomText
							fontWeight="normal"
							type="display"
							customStyle={styles.curvedCardSubtitle}
						>
							Reserve os melhores serviços utilizando o
							TravelCard!
						</CustomText>

						<Button
							onPress={() => 
								navigation.navigate(ScreensEnum.MyTravelCard)
							}
							title="Acessar TravelCard >"
							backgroundColor="#fff"
							color="#000"
							type={'Rounded'}
						/>
					</View>

					<View>
						{/* TODO: the image needs a better crop 
						<Image source={TravelCard} />
					</View>
				</CurvedCard> */}

				<CurvedCard style={styles.conciergeSection}>
					<LinearGradient
						colors={[
							'rgba(174, 202, 21, 1)',
							'rgba(174, 202, 21, 1)',
						]}
						start={[0, 0]}
						end={[1, 1]}
						style={styles.conciergeBackgroundGradient}
					/>

					<View>
						<Text style={styles.conciergeTitle}>
							{translate('conciergeCardTitle')}
						</Text>
						<Text style={styles.conciergeSubTitle}>
							{translate('conciergeCardText')}
						</Text>

						<Button
							onPress={() => setOpen(true)}
							title={translate('buttonConcierge')}
							backgroundColor="#fff"
							color="#000"
							icon={faAngleRight}
							type={'Rounded'}
							customStyle={styles.conciergeButton}
						/>
					</View>

					<View>
						{/* TODO: the image needs a better crop */}
						<Image source={Concierge} style={{width: 100, height: 100}} resizeMode='contain'/>
					</View>
				</CurvedCard>
				<View style={styles.spacer} />
			</ScrollView>
			{/* <CashbackBottomSheet
				isVisible={showCashBackBottomSheet}
				onClose={() => {
					setShowCashBackBottomSheet(false)
				}}
			/> */}
			<BottomSheet
				ref={bottomSheetRef}
				index={open ? 0 : -1}
				snapPoints={[750]}
				enablePanDownToClose={true}
				onClose={() => {
					setOpen(false)
				}}
			>
				<BottomSheetView style={{}}>
					<ConciergeBottomSheet
						navigation={navigation}
						onClose={() => {
							setOpen(false)
							handleClosePress()
						}}
					/>
				</BottomSheetView>
			</BottomSheet>
		</>
	)
}

export default TravelShopHome