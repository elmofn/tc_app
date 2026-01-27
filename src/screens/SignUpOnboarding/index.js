import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Image, SafeAreaView, View, BackHandler } from 'react-native'
import { CustomText, Button } from '../../components'
import { stepOne, stepThree, stepTwo } from './StepsText'
import { styles } from './styles'
import TravelCashGrey from '../../assets/images/logo-travelcash-grey.png'
import StepOne from '../../assets/images/SignUpOnboarding/step-one.png'
import StepTwo from '../../assets/images/SignUpOnboarding/step-two.png'
import StepThree from '../../assets/images/SignUpOnboarding/step-three.png'
import { ScrollView } from 'react-native-gesture-handler'
import { useTranslation } from '../../hooks'

const Stack = createNativeStackNavigator()

const SignUpOnboarding = ({ navigation }) => {

    const { translate } = useTranslation('onboardingScreen')

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (navigation.canGoBack()) {
                navigation.navigate('Home')
            } else {
                // Lógica para quando não há mais telas para voltar
                console.log('Não há mais telas para voltar.');
            }
            return true;
        });

        return () => backHandler.remove();
    }, [navigation]);


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={'one'}>
                {() => (
                    <SafeAreaView style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={TravelCashGrey}
                            
                        />
                        <Image
                            style={styles.banner}
                            source={StepOne}
                            
                        />
                        <View style={styles.textContainer}>
                            <CustomText
                                type={'display'}
                                fontWeight={'bold'}
                                customStyle={styles.title}
                            >
                                {translate('stepOneTitle')}
                            </CustomText>
                            <CustomText
                                type={'display'}
                                fontWeight={'normal'}
                                customStyle={styles.subTitle}
                            >
                                {translate('stepOneSubtitle')}
                            </CustomText>
                            <View>
                            <Button
                                onPress={() => {
                                    navigation.navigate('two')
                                }}
                                title={translate('buttonContinue')}
                                color="#fff"
                                backgroundColor="#000"
                            />
                            <Button
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeContainer' }],
                                    });
                                }}
                                title={translate('buttonSkip')}
                                color="#000"
                                backgroundColor="#fff"
                            />
                            </View>
                        </View>

                    </SafeAreaView>
                )}
            </Stack.Screen>
            <Stack.Screen name={'two'}>
                {() => (
                    <SafeAreaView style={styles.container}>

                        <Image
                            style={styles.logo}
                            source={TravelCashGrey}
                        />
                        <Image
                            style={styles.banner}
                            source={StepTwo}
                        />
                        <View style={styles.textContainer}>
                            <CustomText
                                type={'display'}
                                fontWeight={'bold'}
                                customStyle={styles.title}
                            >
                                {translate('stepTwoTitle')}
                            </CustomText>
                            <CustomText
                                type={'display'}
                                fontWeight={'normal'}
                                customStyle={styles.subTitle}
                            >
                                {translate('stepTwoSubtitle')}
                            </CustomText>
                            <View>
                            <Button
                                onPress={() => {
                                    navigation.navigate(
                                        'three'
                                    )
                                }}
                                title={translate('buttonContinue')}
                                color="#fff"
                                backgroundColor="#000"
                            />
                            <Button
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeContainer' }],
                                    });
                                }}
                                title={translate('buttonSkip')}
                                color="#000"
                                backgroundColor="#fff"
                            />
                            </View>
                        </View>

                    </SafeAreaView>
                )}
            </Stack.Screen>
            <Stack.Screen name={'three'}>
                {() => (
                    <SafeAreaView style={styles.container}>
                        <Image
                            style={styles.logo}
                            source={TravelCashGrey}
                        />
                        <Image
                            style={styles.banner}
                            source={StepThree}
                        />
                        <View style={styles.textContainer}>
                            <CustomText
                                type={'display'}
                                fontWeight={'bold'}
                                customStyle={styles.title}
                            >
                                {translate('stepThreeTitle')}
                            </CustomText>
                            <CustomText
                                type={'display'}
                                fontWeight={'normal'}
                                customStyle={styles.subTitle}
                            >
                                {translate('stepThreeSubtitle')}
                            </CustomText>
                            <View>
                            <Button
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeContainer' }],
                                    });
                                }}
                                title={translate('buttonContinue')}
                                color="#fff"
                                backgroundColor="#000"
                            />
                            <Button
                                onPress={() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeContainer' }],
                                    });
                                }}
                                title={translate('buttonSkip')}
                                color="#000"
                                backgroundColor="#fff"
                            />
                            </View>
                        </View>
                    </SafeAreaView>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

export default SignUpOnboarding