import { useContext, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, Platform } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
    BottomNavigationContext,
} from '../../contexts'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import BottomSheet, {
    BottomSheetView,
} from '@gorhom/bottom-sheet'
import {
    faCommenting,
    faDollar,
    faHome,
    faReceipt,
    faShop,
} from '@fortawesome/free-solid-svg-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { ConciergeBottomSheet } from '../../screens/Home/components/concierge-bottom-sheet'
import { useTranslation } from '../../hooks'

//Screns
import Home from '../../screens/Home'
import TravelShop from '../../screens/TravelShop'
import Concierge from '../../screens/Concierge'
import Deposit from '../../screens/Deposit'
import Statement from '../../screens/Statement'

const Tab = createBottomTabNavigator()

const CustomConciergeButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} >
        <View
            style={{
                width: 64,
                height: 64,
                backgroundColor: '#AFCA15',
                borderRadius: 50,
                bottom: 20,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                //position: 'absolute',
                paddingbottom: 20,
                borderWidth: 2,
                borderColor: 'white'
            }}
        >
            <FontAwesomeIcon
                icon={faCommenting}
                color={'#000'}
            />
            <Text
                style={{
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: Platform.OS === 'ios' ? 8 : 10,
                }}
            >
                Concierge
            </Text>
        </View>
    </TouchableOpacity >
);

const Tabs = ({ open, setOpen }) => {
    const { setShow } = useContext(BottomNavigationContext)
    const { translate } = useTranslation('tabs')

    const handleConciergePress = () => {
        setOpen(!open)
        setShow(false)
        // Aqui você pode disparar ações globais ou interagir com outros componentes.
        // Exemplo: dispatch de uma ação global, navegação, etc.
    };

    const { show } = useContext(BottomNavigationContext)
    return (
        <Tab.Navigator
            backBehavior="history"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    display: show ? 'flex' : 'none',
                    backgroundColor: 'black',
                    borderRadius: 30,
                    height: 56,
                    alignItems: "",
                    right: 20,
                    left: 20,
                    bottom: 30,
                    position: 'absolute',
                    zIndex: 2,
                },
            }}
            initialRouteName={'Home'}
        >
            {/* TODO: find a better type for using here */}

            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 12 // <-- AJUSTE AQUI
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faHome}
                                color={focused ? '#AFCA15' : '#707A81'}
                                size={22}
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: focused ? '#AFCA15' : '#707A81',
                                    fontSize: 10,
                                    marginTop: 3,
                                }}
                            >
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="TravelShop"
                component={TravelShop}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 12, // <-- AJUSTE AQUI
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faShop}
                                color={focused ? '#AFCA15' : '#707A81'}
                                size={22}
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: focused ? '#AFCA15' : '#707A81',
                                    fontSize: 10,
                                    marginTop: 3,
                                }}
                            >
                                Travel Shop
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Concierge"
                options={{
                    tabBarButton: (props) => <CustomConciergeButton {...props} onPress={handleConciergePress} />,
                    tabBarIcon: () => null,
                }}
            >
                {() => (<View />)}
            </Tab.Screen>
            <Tab.Screen
                name="Deposit"
                component={Deposit}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 12, // <-- AJUSTE AQUI
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faDollar}
                                color={focused ? '#AFCA15' : '#707A81'}
                                size={22}
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: focused ? '#AFCA15' : '#707A81',
                                    fontSize: 10,
                                    marginTop: 3,
                                }}
                            >
                                {translate('deposit')}
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name={'Statement'}
                component={Statement}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: 12, // <-- AJUSTE AQUI
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faReceipt}
                                color={focused ? '#AFCA15' : '#707A81'}
                                size={22}
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    color: focused ? '#AFCA15' : '#707A81',
                                    fontSize: 10,
                                    marginTop: 3,
                                }}
                            >
                                {translate('extract')}
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const HomeContainer = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const { show, setShow } = useContext(BottomNavigationContext)


    const bottomSheetRef1 = useRef(null)

    const handleClosePress = () => bottomSheetRef1.current.close()

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <LinearGradient
                colors={['#fff0', '#fff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.2 }}
                style={{
                    width: '100%',
                    height: 120,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    zIndex: 1,
                    display: show ? 'flex' : 'none',
                }}
            ></LinearGradient> */}
            <Tabs open={open} setOpen={setOpen} />
            <BottomSheet
                ref={bottomSheetRef1}
                index={open ? 0 : -1}
                snapPoints={[750]}
                //enablePanDownToClose={true}
                onClose={() => {
                    //setShow(true)
                    setOpen(false)
                }}
            >
                <BottomSheetView style={{}}>
                    <ConciergeBottomSheet
                        navigation={navigation}
                        onClose={() => {
                            setOpen(false)
                            handleClosePress()
                            setShow(true)
                        }}
                    />
                </BottomSheetView>
            </BottomSheet>
        </View>
    )
}

export default HomeContainer