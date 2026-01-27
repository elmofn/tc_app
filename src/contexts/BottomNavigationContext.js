import { createContext, useState } from 'react'

export const BottomNavigationContext = createContext({
	
})

export const BottomNavigationContextProvider = ({
	children,
}) => {
	const [show, setShow] = useState(true)
	return (
		<BottomNavigationContext.Provider value={{ show , setShow }}>
			{children}
		</BottomNavigationContext.Provider>
	)
}
