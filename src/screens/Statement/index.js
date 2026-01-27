import { Pressable, SafeAreaView, ScrollView, View, Image, Text } from 'react-native'
import { CustomText } from '../../components'
import { useTranslation } from '../../hooks'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StatementCard } from './components/Statement-card'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { TransactionItem } from './components/Transaction-item'
import { styles } from './styles'
import { SearchInput } from './components/Search-input'
import { useContext, useEffect, useState } from 'react'
import { AccountContext } from '../../contexts'

//helpers
import { HelpersFinancial, HelpersCards, HelpersCurrencies } from '../../helpers'
const helpersFinancial = new HelpersFinancial()
const helpersCards = new HelpersCards()
const helpersCurrencies = new HelpersCurrencies()

const Statement = ({ navigation }) => {
	const { translate } = useTranslation('statement')
	const { accountDetails } = useContext(AccountContext)
	const [transactions, setTransactions] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [balanceCardValue, setBalanceCardValue] = useState(0)
	const [balanceAccountValue, setBalanceAccountValue] = useState(0)
	const [currencyList, setCurrencyList] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const result = await helpersCurrencies.GetCurrency()
			setCurrencyList(result.currencies)
			const ballanceAccount = await helpersFinancial.GetBalanceAccount({ accountId: accountDetails?.accountId || '' })
			const balanceCardValue = await helpersCards.GetBalanceCard({ accountId: accountDetails?.accountId || '' })
			setBalanceCardValue(balanceCardValue.data.available)
			setBalanceAccountValue(ballanceAccount.data.available)
		}
		fetchData()
	}, [])

	useEffect(() => {
		const fetchTransactions = async () => {
			const today = new Date()
			const oneMonthAgo = new Date()
			oneMonthAgo.setMonth(today.getMonth() - 1)
			try{
				const response = await helpersFinancial.GetAccountStatements({
					"accountId": accountDetails?.accountId || '',
					"dateStart": today,
					"dateEnd": oneMonthAgo
				})
				setTransactions(response.data.transactions)
			}catch(e){

			}finally{
				setIsLoading(false)
			}	
		}
		
		currencyList.length > 0 ? fetchTransactions() : null
	}, [currencyList])

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
		<View>
			<View style={styles.titleContainer}>
				<Pressable onPress={() => navigation.goBack()}>
					<FontAwesomeIcon
						icon={faChevronLeft}
						size={18}
						color="#191919"
					/>
				</Pressable>

				<CustomText
					fontWeight="bold"
					type="display"
					customStyle={styles.title}
				>
					{translate('title')}
				</CustomText>
			</View>

			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				removeClippedSubviews={true}
			>
				<StatementCard
					cardBalance={accountDetails?.defaultCurrency.symbol +
						(
							balanceCardValue *
							(accountDetails?.defaultCurrency
								.currentExchangeRate || 0)
						).toFixed(2)}
					cardBalanceDollar={balanceCardValue}
					walletBalance={accountDetails?.defaultCurrency.symbol +
						(
							balanceAccountValue *
							(accountDetails?.defaultCurrency
								.currentExchangeRate || 0)
						).toFixed(2)}
					walletBalanceDollar={balanceAccountValue}
					accountDetails={accountDetails}
				/>

				{/* <SearchInput
					placeholder={translate('inputPlaceholderSearch')}
					onChangeText={(text) => {
						console.log(text)
					}}
				/> */}
				{
					transactions.length > 0 ? <View style={styles.transactionListContent}>
						{(transactions.map((item) => (
						<TransactionItem
							key={item.title + item.id}
							title={item.title}
							value={item.value}
							valueDollar={item.originValue}
							date={item.creationTime}
							type={item.type}
							description={item.description}
							originCurrencyId={currencyList.find(e => e.id === item.originCurrencyId).symbol}
						/>)))}
					</View> 
					:
					<Text>{translate('EmptyTransactions')}</Text>
				}
				<View style={{height: 200}}></View>
			</ScrollView>
		</View>
	)
}

export default Statement