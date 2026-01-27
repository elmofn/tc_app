import React, { useState, useEffect, useRef } from 'react';
import { Text } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';


export const Timer = ({ minutes, isTimerRunning, setIsTimerRunning }) => {
  const [time, setTime] = useState(minutes * 60);
  const timerIdRef = useRef(null);

  useEffect(() => {
    const startTimer = () => {
      timerIdRef.current = setInterval(() => {
        if(isTimerRunning){
          setTime(prevTime => {
            if (prevTime === 0) {
              clearInterval(timerIdRef.current);
              setIsTimerRunning(false)
              return 0;
            } else {
              return prevTime - 1;
            }
          });
        }
      }, 1000);
    };

    startTimer();

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [isTimerRunning]);



  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Text>{formatTime(time)}</Text>
  );
};