import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersFaq {
   async GetFAQ(language) {
      try {   

         const { token } = (await storage.get('auth-token')) 

         const getFAQ = await api.get('/api/Content/GetFAQ?language='+language,
            {
               headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin' : '*',
                  'Authorization': 'Bearer ' + token
               },
            },
         )
   
         return getFAQ
      } catch (error) {
         return error
      }  
   }

}

export { HelpersFaq };



