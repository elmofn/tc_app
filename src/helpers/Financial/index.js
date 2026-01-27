import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersFinancial {

   async GetBalanceAccount(payload) {
      try {
         const { token } = (await storage.get('auth-token')) 

         const balanceAccount = await api.post('/api/Financial/GetBalanceAccount', payload,
            {
               headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin' : '*',
                  'Authorization': 'Bearer ' + token
               },
            },
         )
			return balanceAccount
      } catch (error) {
         return error.response
      }  
	}

   async GetAccountStatements(payload) {
      try {
         const { token } = (await storage.get('auth-token'))

         const getAccountStatements = await api.post('/api/Financial/GetAccountStatements', payload,
            {
               headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin' : '*',
                  'Authorization': 'Bearer ' + token
               },
            },
         )

			return getAccountStatements
      } catch (error) {
         return error.response
      }  
	}

}

export { HelpersFinancial };


							
