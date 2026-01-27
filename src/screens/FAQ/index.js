import { useEffect, useState, useContext, useRef } from 'react'
import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
	useWindowDimensions
} from 'react-native'
import { AccountContext } from '../../contexts'
import styles from './styles'
import RenderHtml from 'react-native-render-html';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import BottomSheet, {
	BottomSheetView,
} from '@gorhom/bottom-sheet'
import { ConciergeBottomSheet } from '../Home/components/concierge-bottom-sheet'

import Concierge from '../../assets/images/concierge.png'
import { LinearGradient } from 'expo-linear-gradient'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

import { ScreenTitle, Button } from '../../components'
import { useTranslation } from '../../hooks'

//helpers
import { HelpersFaq } from '../../helpers'
const helpersFaq = new HelpersFaq()

const FAQ = ({ navigation }) => {
	const [faqs, setFaqs] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = useState(false)
	const { accountDetails } = useContext(AccountContext)
	const { width } = useWindowDimensions();
	const { translate } = useTranslation('travelShopScreen')
	const bottomSheetRef = useRef(null)

	useEffect(() => {
		const fecthFaq = async() => {
			try{
				const faqs = await helpersFaq.GetFAQ(accountDetails.defaultIdiom)
				console.log(faqs.data[0].children)
				setFaqs(faqs.data.map(e => {
					return {
						...e,
						isOpen: false 
					}
				}))
			}catch(e) {
				console.log(e)
			}finally{
				setIsLoading(false)
			}
		}
		
		fecthFaq()
	}, [])

	const updateFaq = (faqIdToUpdate) => {
		const updatedFaqs = faqs.map(faq =>
			faq.contentId === faqIdToUpdate ? { ...faq, isOpen: !faq.isOpen } : faq
		);

		setFaqs(updatedFaqs)
	}

	const handleClosePress = () => bottomSheetRef.current.close()

	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image
					source={require('./../../assets/gifs/loading.gif')}
					style={{
						width: 200,
						height: 200,
					}}
				/>
			</View>
		)
	}

	return (
		<View style={styles.pageContainer}>
			<ScrollView style={styles.scrollViewContainer}>
				<ScreenTitle navigation={navigation} title="FAQ" showBackButton />
				<View style={styles.faqListContainer}>
					{faqs.map(faq => (
						<View key={faq.contentId}>
							<Pressable onPress={() => updateFaq(faq.contentId)}>
								<View style={styles.faqHeader}>
									<Text style={{...styles.faqTitle, fontWeight: faq.isOpen? '700' : '400', textAlign:'justify' }}>{faq.title}</Text>
									<FontAwesomeIcon icon={faChevronDown} color={'#1919194d'} size={16} />
								</View>
							</Pressable>

							<View style={faq.isOpen ? styles.faqAnswerOpened : styles.faqAnswerClosed}>
								{/* <Text style={{textAlign:'justify'}}>{faq.richText}</Text> */}
								<RenderHtml
									contentWidth={width}
									source={{html: `${faq.richText}`}}
								/>
							</View>
						</View>
					))}
				</View>

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
				</View>
				<View style={styles.spacer} />
			</ScrollView>
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
		</View>
	)
}

export default FAQ