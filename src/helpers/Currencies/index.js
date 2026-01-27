import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersCurrencies {

   async GetCurrency(payload) { 
      return new Promise(async(resolve, reject) => {
         try {

            const { token } = (await storage.get('auth-token')) 
            
            const getCurrency = await api.post('/api/Financial/GetCurrency', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin' : '*',
                     'Authorization': 'Bearer ' + token
                  },
               },
            )

         
            if (getCurrency.data.result === false) {
               throw new Error(getCurrency.data.message)
            }

      
            return resolve({
				   currencies: getCurrency.data.currencies,
			   })
         } catch (error) {
            return reject(error)
         }  
      })
   }
}

export { HelpersCurrencies }