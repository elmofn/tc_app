import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ValueScreen } from './components/ValueScreen'
import { PixScreen } from './components/PixScreen'
import { CardsScreen } from './components/CardsScreen'

const Stack = createNativeStackNavigator()

const Deposit = () => {
	return (
		<Stack.Navigator
			initialRouteName={'Pix'}
			screenOptions={{
				headerShown: false,
			}}
		>
			{/* <Stack.Screen name={'Value'} component={ValueScreen} /> */}
			<Stack.Screen name={'Pix'} component={PixScreen} />
			{/* <Stack.Screen name={'Cards'} component={CardsScreen} /> */}
		</Stack.Navigator>
	)
}

export default Deposit