import React, {useState, useContext, useEffect} from "react";

import {
	Image,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View,
	useWindowDimensions
} from 'react-native'
import styles from "./styles";
import { AccountContext } from '../../contexts'
import { ScreenTitle } from '../../components'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown'
import RenderHtml from 'react-native-render-html';

import { HelpersContent } from "../../helpers";
const helpersContent = new HelpersContent()

const Alert = ({navigation}) => {
    const [faqs, setFaqs] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = useState(false)
	const { accountDetails } = useContext(AccountContext)
	const { width } = useWindowDimensions();

	useEffect(() => {
		const fecthFaq = async() => {
			try{
				const faqs = await helpersContent.GetAlerts(accountDetails.defaultIdiom, accountDetails.accountId)
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
				<ScreenTitle navigation={navigation} title="Alerts" showBackButton />
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
				<View style={styles.spacer} />
			</ScrollView>
		</View>
	)
}

export default Alert