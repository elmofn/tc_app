import React from 'react';
import { useContext, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import { Button, CustomText, ScreenTitle } from '../../../../components'
import { styles } from './styles'
import { BottomNavigationContext } from '../../../../contexts'
import StepOne from '../../../../assets/images/travelshop/step-one.png'
import StepTwo from '../../../../assets/images/travelshop/step-two.png'
import StepThree from '../../../../assets/images/travelshop/step-three.png'

import { StorageAdapter } from '../../../../utils'
const storage = new StorageAdapter()

const TravelShopActivation = ({
	navigation,
}) => {
	const [currentStep, setCurrentStep] = useState('one')
	const { setShow } = useContext(BottomNavigationContext)

	useFocusEffect(
		React.useCallback(() => {
			// Esta função é chamada quando a tela ganha foco
			setShow(false);

			// Retorna uma função de limpeza se necessário
			return () => {
				// Qualquer lógica de limpeza que você queira executar quando a tela perder o foco
				// Se você quiser definir setShow(false) ao sair, você pode fazê-lo aqui
				setShow(true);
			};
		}, []) // Dependências vazias garantem que o efeito execute apenas quando a tela ganha foco
	);

	return (
		<View style={styles.contentContainer}>
			{currentStep === 'one' ? (
				<>
					<ScreenTitle
						navigation={navigation}
						title="TravelShop"
						showBackButton={false}
					/>
					<Image source={StepOne} style={styles.image} />
					<CustomText
						fontWeight="bold"
						type="display"
						customStyle={styles.title}
					>
						Descubra um mundo de possibilidades com o TravelShop
					</CustomText>
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.subTitle}
					>
						Reserve hotéis luxuosos, encontre as melhores tarifas em
						passagens aéreas e aluguel de carros, e garanta entradas
						para os parques temáticos mais populares.
					</CustomText>
					<Button
						onPress={() =>
							setCurrentStep('two')
						}
						title="Continuar"
						backgroundColor="#000"
						color="#fff"
					/>
					<Button
						onPress={() => {
							navigation.reset({
								index: 0,
								routes: [{ name: 'TravelShopHome' }],
							});
							storage.set('shop-configs', { skipIntro: true })
						}}
						title="Pular"
						backgroundColor="#fff"
						color="#000"
					/>
				</>
			) : currentStep === 'two' ? (
				<>
					<ScreenTitle
						navigation={navigation}
						title="TravelShop"
						showBackButton={false}
					/>
					<Image source={StepTwo} style={styles.image} />
					<CustomText
						fontWeight="bold"
						type="display"
						customStyle={styles.title}
					>
						Maximize suas recompensas com o TravelCard
					</CustomText>
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.subTitle}
					>
						Cada compra no TravelShop não apenas facilita sua
						viagem, mas também lhe proporciona cashback!
					</CustomText>
					<Button
						onPress={() =>
							setCurrentStep('three')
						}
						title="Continuar"
						backgroundColor="#000"
						color="#fff"
					/>
					<Button
						onPress={() => {
							navigation.reset({
								index: 0,
								routes: [{ name: 'TravelShopHome' }],
							});
							storage.set('shop-configs', { skipIntro: true })
						}}
						title="Pular"
						backgroundColor="#fff"
						color="#000"
					/>
				</>
			) : (
				<>
					<ScreenTitle
						navigation={navigation}
						title="TravelShop"
						showBackButton={false}
					/>
					<Image source={StepThree} style={styles.image} />
					<CustomText
						fontWeight="bold"
						type="display"
						customStyle={styles.title}
					>
						Faça da sua jornada uma experiência tranquila e
						recompensadora
					</CustomText>
					<CustomText
						fontWeight="normal"
						type="display"
						customStyle={styles.subTitle}
					>
						Com o TravelShop, você pode planejar e reservar todos os
						detalhes da sua viagem em um só lugar, enquanto acumula
						recompensas.
					</CustomText>
					<Button
						onPress={() => {
							navigation.reset({
								index: 0,
								routes: [{ name: 'TravelShopHome' }],
							});
							storage.set('shop-configs', { skipIntro: true })
						}}
						title="Acessar TravelShop"
						backgroundColor="#000"
						color="#fff"
					/>
				</>
			)}
		</View>
	)
}

export default TravelShopActivation