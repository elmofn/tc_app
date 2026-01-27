import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersContent {
    async ConfirmRead(payload) {
        try {
            const { token } = (await storage.get('auth-token'))

            const confirmRead = await api.post('/api/Content/ConfirmRead', payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'Bearer ' + token
                    },
                },
            )
            return confirmRead
        } catch (error) {
            return error.response
        }
    }

    async GetAlerts(language, accountId) {
        try {   
  
           const { token } = (await storage.get('auth-token')) 
  
           const getFAQ = await api.get('/api/Content/GetAlerts?accountId='+accountId+'&language='+language,
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

export { HelpersContent };



