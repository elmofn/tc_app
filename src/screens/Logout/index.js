import React, { useEffect, useContext } from "react";
import { View, Image } from 'react-native'
import { AccountContext } from '../../contexts'

import { HelpersAccount } from '../../helpers'
const helpersAccount = new HelpersAccount()

import { StorageAdapter } from '../../utils';
const storage = new StorageAdapter()


const Logout = ({ navigation }) => {
    const { accountDetails, setAccountDetails } = useContext(AccountContext)

    useEffect(() => {
        const deleteAccount = async() => {
            try{
                await helpersAccount.RemoveAccount({
                	accountId: accountDetails?.accountId,
                	blockAccount: false
                })
                setAccountDetails(null)
                storage.remove('accountDetails')
                storage.remove('auth-token')
                storage.remove('saved-password')
                storage.remove('app-configs')
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Welcome" }]
                });
            }catch(e){
                console.log('deu erro lá', e)
            }
        } 

        deleteAccount()
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                source={require('../../assets/gifs/loading.gif')}
                style={{
                    width: 200,
                    height: 200,
                }}
            />
        </View>
    )
}

export default Logout