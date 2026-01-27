import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersCards {
   async GetBalanceCard(payload) {
      try {
         const { token } = (await storage.get('auth-token'))

         const balanceCard = await api.post('/api/Cards/GetBalanceCard', payload,
            {
               headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  'Authorization': 'Bearer ' + token
               },
            },
         )
         return balanceCard
      } catch (error) {
         return error.response
      }
   }

}

export { HelpersCards };



