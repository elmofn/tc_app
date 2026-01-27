import { createContext, useEffect, useState } from 'react'

export const AccountContext = createContext({
	accountDetails: null,
	setAccountDetails: () => {},
})

export const AccountContextProvider = ({
	children,
	storage,
}) => {
	const [accountDetails, setAccountDetails] = useState(null)
	const [initializing, setInitializing] = useState(true)


	useEffect(() => {
		const fetchStoragedData = async () => {
			const accountDetails = (await storage.get('accountDetails'))
			if (accountDetails) {
				setAccountDetails(accountDetails)
				setInitializing(false)
			}else{
				setInitializing(false)
			}
		}

		fetchStoragedData()
	}, [])

	useEffect(() => {
		if (accountDetails !== null) {
			storage.set('accountDetails', accountDetails)
		}
	}, [accountDetails])
	
	return (
		<AccountContext.Provider value={{ initializing, accountDetails, setAccountDetails }}>
			{children}
		</AccountContext.Provider>
	)
}
