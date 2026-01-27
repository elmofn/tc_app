import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import BackgroundTimer from 'react-native-background-timer';

export const Timer = ({ minutes }) => {
	const [time, setTime] = useState(minutes * 60)

	useEffect(() => {
		const timer = BackgroundTimer.runBackgroundTimer(() => { 
			setTime(prevTime => {
				if (prevTime === 0) {
					clearInterval(timer)
					return 0
				} else {
					return prevTime - 1
				}
			})
		}, 1000)

		return () => BackgroundTimer.stopBackgroundTimer()
	}, [])
	  	  

	const formatTime = (timeInSeconds) => {
		const minutes = Math.floor(timeInSeconds / 60)
		const seconds = timeInSeconds % 60
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
	}

	return (
		<Text>{formatTime(time)}</Text>
	)
}