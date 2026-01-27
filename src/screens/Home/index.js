import { FC, useCallback, useContext, useEffect, useRef, useState } from 'react'
import {
	Image,
	ImageBackground,
	Pressable,
	ScrollView,
	Text,
	View,
	Linking
} from 'react-native'
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { faBell } from '@fortawesome/free-solid-svg-icons/faBell'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons/faCircleQuestion'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faCircleInfo, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { removeHtmlTags } from '../../utils'

import TravelCashIcon from '../../assets/images/icon-travelcash.png'

import TravelCard from '../../assets/images/travelcard.png'
import Concierge from '../../assets/images/concierge.png'
import {
	Button,
	CashbackBottomSheet,
	CurvedCard,
	CustomText,
} from '../../components'
import { AccountContext } from '../../contexts'
import ibisLogo from '../../assets/images/mocks/ibis-logo-mock.png'
import { ConciergeBottomSheet } from './components/concierge-bottom-sheet'
import { faAngleRight, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { TravelCardBottomSheet } from './components/travelcard-bottom-sheet'
import { useTranslation } from '../../hooks'
import BottomSheet, {
	BottomSheetBackdrop,
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { Portal } from 'react-native-portalize'

//helpers
import { HelpersFinancial, HelpersCards, HelpersContent } from '../../helpers'
const helpersFinancial = new HelpersFinancial()
const helpersCards = new HelpersCards()
const helpersContent = new HelpersContent()

const Home = ({ navigation }) => {
	const { translate } = useTranslation('homeScreen')
	const [bottomSheets, setBottomSheets] = useState({
		travelCard: false,
		concierge: false,
		cashback: false,
	})
	const bottomSheetRef = useRef(null)
	const goToTravelCardScreen = () => {
		setBottomSheets({ ...bottomSheets, travelCard: true })
	}
	const { accountDetails, setAccountDetails } = useContext(AccountContext)
	const [balanceCardValue, setBalanceCardValue] = useState(0)
	const [balanceAccountValue, setBalanceAccountValue] = useState(0)
	const [show, setShow] = useState(true)

	const renderBackdrop = useCallback(
		(props) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
			/>
		), []
	)

	useEffect(() => {
		const fetchData = async () => {
			const ballanceAccount = await helpersFinancial.GetBalanceAccount({ accountId: accountDetails?.accountId || '' })
			const balanceCardValue = await helpersCards.GetBalanceCard({ accountId: accountDetails?.accountId || '' })
			setBalanceAccountValue(ballanceAccount.data.available)
			setBalanceCardValue(balanceCardValue.data.available)
		}
		fetchData()
	}, [])

	const handleClosePress = () => bottomSheetRef.current.close()

	const openWhatsApp = async (url) => {
		await Linking.openURL(url);
	}

	const openCall = async (url) => {
		// Checking if the link is supported for links with custom URL scheme.
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			// Opening the link with some app, if the URL scheme is "http" the web link should be opened
			// by some browser in the mobile
			await Linking.openURL(url);
		} else {
			console.log(`Don't know how to open this URL: ${url}`);
		}
	}


	const closeAlert = async (alertIdToUpdate) => {
		try {
			const updatAlerts = accountDetails.alerts.filter(faq => faq.contentId != alertIdToUpdate);
			setAccountDetails({ ...accountDetails, alerts: updatAlerts })
			await helpersContent.ConfirmRead({
				confirmationId: "00000000-0000-0000-0000-000000000000",
				"contentId": alertIdToUpdate,
				"accountId": accountDetails.accountId,
				"confirmationDate": new Date()
			})
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.pageContainer}>
				<LinearGradient
					colors={[
						'rgba(228, 231, 232, 1)',
						'rgba(255, 255, 255, 1)',
					]}
					start={[0, 0]}
					end={[1, 1]}
					style={styles.backgroundGradient}
				/>

				<View style={[styles.banner, { height: accountDetails?.alerts?.length > 0 ? accountDetails?.alerts?.length * 220 : 170 }]}>
					<LinearGradient
						colors={[
							'rgba(25, 25, 25, 1)',
							'rgba(25, 25, 25, 0.85)',
							'rgba(25, 25, 25, 0.65)',
						]}
						start={[0.1, 0.1]}
						end={[1, 1]}
						style={styles.backgroundGradient}
					/>
				</View>

				<View style={styles.userInfoContainer}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							gap: 8,
							alignItems: 'center',
							flex: 2
						}}
					>
						<Image source={TravelCashIcon} />
						<Text style={styles.userName} numberOfLines={1} ellipsizeMode='tail'>
							{accountDetails?.name}
						</Text>
					</View>
					<View style={styles.iconsSection}>
						<Pressable
							onPress={() => navigation.navigate('FAQ')}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						>
							<FontAwesomeIcon
								icon={faCircleQuestion}
								color={'#fff'}
								size={16}
							/>
						</Pressable>
						<Pressable
							onPress={() => navigation.navigate('Alerts')}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						>
							<FontAwesomeIcon
								icon={faBell}
								color={'#fff'}
								size={16}
							/>
						</Pressable>

						<Pressable
							onPress={() => navigation.navigate('Profile')}
							hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
						>
							<FontAwesomeIcon
								icon={faUser}
								color={'#fff'}
								size={16}
							/>
						</Pressable>
					</View>
				</View>
				<View style={{ paddingTop: 24 }}>
					{
						accountDetails?.alerts?.map((item, index) => {
							return (
								<View key={index.toString()} style={{ height: 50, backgroundColor: '#E30974', justifyContent: 'space-between', borderRadius: 8, alignItems: 'center', paddingHorizontal: 15, flexDirection: 'row' }}>
									<View style={{ flexDirection: 'row', alignItems: 'center' }}>
										<FontAwesomeIcon
											icon={faCircleInfo}
											size={14}
											color="#FFF"
											style={styles.infoIcon}
										/>
										<Text style={{ color: 'white', fontWeight: '700', paddingLeft: 5 }}>
											{removeHtmlTags(item.description)}
										</Text>
									</View>
									<Pressable onPress={() => closeAlert(item.contentId)}>
										<FontAwesomeIcon
											icon={faCircleXmark}
											size={14}
											color="#FFF"
											style={styles.infoIcon}
										/>
									</Pressable>
								</View>
							)
						})
					}
				</View>
				<View style={styles.balanceSection}>
					<View style={styles.balanceTitleContainer}>
						<Text style={styles.balanceTitle}>{translate('saldo')}</Text>
						{
							show ?
								<Pressable onPress={() => setShow(!show)}>
									<FontAwesomeIcon
										icon={faEyeSlash}
										color={'#191919'}
										size={16}

									/>
								</Pressable>
								:
								<Pressable onPress={() => setShow(!show)}>
									<FontAwesomeIcon
										icon={faEye}
										color={'#191919'}
										size={16}
									/>
								</Pressable>
						}
					</View>
					{
						show ? <Text style={styles.balanceValue}>
							{accountDetails?.defaultCurrency.symbol}{' '}
							{(
								balanceAccountValue *
								(accountDetails?.defaultCurrency
									.currentExchangeRate || 0)
							).toFixed(2)}
						</Text>
							: <Text style={styles.balanceValue}>
								*****
							</Text>
					}

					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'flex-end',
						}}
					>
						{
							show ? <Text style={styles.balanceValueConverted}>
								${' '}{balanceAccountValue?.toFixed(2)}
							</Text> : <Text style={styles.balanceValueConverted}>
								*****
							</Text>
						}

						<Button
							onPress={() =>
								navigation.navigate('Statement')
							}
							title={translate('buttonStatement')}
							backgroundColor="#000"
							color="#fff"
							icon={faAngleRight}
							type={'Rounded'}
						/>
					</View>
				</View>

				{
					accountDetails?.notshowtravelcard ?
						<View style={styles.cardBalanceSection}>
							<LinearGradient
								colors={[
									'rgba(4, 178, 212, 1)',
									'rgba(4, 171, 203, 1)',
								]}
								start={[0, 0]}
								end={[1, 1]}
								style={styles.cardBalanceBackgroundGradient}
							/>

							<View style={styles.containerSectionCard}>
								<View style={{ flex: 1 }}>
									<Text style={styles.cardBalanceActiveTitle}>
										{translate('travelCardActiveText')}
									</Text>
									<Button
										onPress={() =>
											setBottomSheets({
												...bottomSheets,
												concierge: true,
											})
										}
										title={translate('buttonActiveTravelCard')}
										backgroundColor="#fff"
										color="#000"
										icon={faAngleRight}
										type={'Rounded'}
										customStyle={styles.conciergeButton}
									/>
								</View>

								<Image source={TravelCard} resizeMode='contain' />

							</View>
						</View>
						:
						<>

							<CurvedCard style={styles.firstDepositCard}>
								<ImageBackground style={styles.firstDepositCardImage}>
									<CustomText
										fontWeight="normal"
										type="display"
										customStyle={styles.accessStatementButtonText}
									>
										{translate('firstDepositCardText')}
									</CustomText>
									<Button
										onPress={() => {
											navigation.navigate('Deposit')
										}}
										title={translate('buttonDeposit')}
										backgroundColor="#000"
										color="#fff"
										customStyle={styles.firstDepositCardButton}
									/>
								</ImageBackground>
							</CurvedCard>

							<View style={styles.cardBalanceSection}>
								<LinearGradient
									colors={[
										'rgba(4, 178, 212, 1)',
										'rgba(4, 171, 203, 1)',
									]}
									start={[0, 0]}
									end={[1, 1]}
									style={styles.cardBalanceBackgroundGradient}
								/>

								<View>
									<Text style={styles.cardBalanceTitle}>
										{translate('travelCardBalanceText')}
									</Text>
									<Text style={styles.cardBalanceValue}>
										{accountDetails?.defaultCurrency.symbol}{' '}
										{(
											balanceCardValue *
											(accountDetails?.defaultCurrency
												.currentExchangeRate || 0)
										).toFixed(2)}
									</Text>
									<Text style={styles.cardBalanceValueConverted}>
										$ {balanceCardValue.toFixed(2)}
									</Text>

									<Button
										onPress={() => goToTravelCardScreen()}
										title={translate('buttonTravelCard')}
										backgroundColor="#fff"
										color="#000"
										type={'Rounded'}
										icon={faAngleRight}
										customStyle={styles.accessTravelCardButton}
									/>
								</View>

								<View>
									<Image source={TravelCard} />
								</View>
							</View>
						</>
				}


				<View style={styles.conciergeSection}>
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
							onPress={() =>
								setBottomSheets({
									...bottomSheets,
									concierge: true,
								})
							}
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
						<Image source={Concierge} style={{ width: 115, height: 115 }} resizeMode='contain' />
					</View>
				</View>

				{/* <ScrollView
					horizontal={true}
					contentContainerStyle={styles.cashbackCardContainer}
				>
					<CashbackCard
						setShowBottomSheet={() =>
							setBottomSheets({ ...bottomSheets, cashback: true })
						}
					/>
					<CashbackCard
						setShowBottomSheet={() =>
							setBottomSheets({ ...bottomSheets, cashback: true })
						}
					/>
					<CashbackCard
						setShowBottomSheet={() =>
							setBottomSheets({ ...bottomSheets, cashback: true })
						}
					/>
					<CashbackCard
						setShowBottomSheet={() =>
							setBottomSheets({ ...bottomSheets, cashback: true })
						}
					/>
				</ScrollView> */}

				{/* <HighlightedCashbacks
					highlights={cashbacksMock.highlights}
					setShowBottomSheet={() =>
						setBottomSheets({ ...bottomSheets, cashback: true })
					}
				/> */}

				{/* <ScrollView
					horizontal={true}
					contentContainerStyle={styles.supportCardsContainer}
				>
					<LinearGradient
						colors={['#fff0', 'rgba(255,255,255,0.33)']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.supportCard}
					>
						<CustomText
							fontWeight="bold"
							type="display"
							customStyle={styles.supportCardTitle}
						>
							WhatsApp
						</CustomText>
						<Image width={210} height={124} source={require("../../assets/images/whatsApp.png")} />
						<Button
							onPress={() => openWhatsApp(`https://wa.me/5511988167233?text=${translate('conciergeMessage')}!`)}
							title={translate("goToWhatsApp")}
							type={'Rounded'}
							icon={faAngleRight}
							backgroundColor="#fff"
							color="#000"
						/>
					</LinearGradient>

					<LinearGradient
						colors={['#fff0', 'rgba(255,255,255,0.33)']}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={styles.supportCard}
					>
						<CustomText
							fontWeight="bold"
							type="display"
							customStyle={styles.supportCardTitle}
						>
							{translate("titleCard")}
						</CustomText>
						<Image width={210} height={124} source={require("../../assets/images/call.png")} />
						<Button
							onPress={() => openCall('https://calendly.com/travelcash')}
							title={translate("goToVideoCall")}
							type={'Rounded'}
							icon={faAngleRight}
							backgroundColor="#fff"
							color="#000"
						/>
					</LinearGradient>
				</ScrollView> */}

				<View style={styles.spacer} />
				<Portal>
					<BottomSheet
						ref={bottomSheetRef}
						index={
							bottomSheets.travelCard ||
								bottomSheets.cashback ||
								bottomSheets.concierge
								? 0
								: -1
						}
						snapPoints={
							bottomSheets.cashback
								? [700]
								: bottomSheets.travelCard
									? [550]
									: [750]
						}
						backdropComponent={renderBackdrop}
						enablePanDownToClose={true}
						onChange={(index) => {
							if (index === -1) {
								setBottomSheets({
									travelCard: false,
									concierge: false,
									cashback: false,
								})
								handleClosePress()
							}
						}}
					>
						<BottomSheetView>
							{bottomSheets.travelCard && (
								<TravelCardBottomSheet
									navigation={navigation}
									onClose={() => {
										setBottomSheets({
											...bottomSheets,
											travelCard: false,
										})
										handleClosePress()
									}}
								/>
							)}
							{bottomSheets.concierge && (
								<ConciergeBottomSheet
									navigation={navigation}
									onClose={() => {
										setBottomSheets({
											...bottomSheets,
											concierge: false,
										})
										handleClosePress()
									}}
								/>
							)}
							{bottomSheets.cashback && (
								<CashbackBottomSheet
									onClose={() => {
										setBottomSheets({
											...bottomSheets,
											cashback: false,
										})
									}}
								/>
							)}
						</BottomSheetView>
					</BottomSheet>
				</Portal>
			</ScrollView>
		</View>
	)
}

export default Home