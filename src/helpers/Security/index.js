import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersSecurity {

   async SignIn(payload) {
      return new Promise(async(resolve, reject) => {
         try {
            const auth = await api.post('/api/Security/Signin', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*'
                  },
               },
            )
   
            storage.set('auth-token', { token: auth.data.token })
   
            const { accountDetails, account, balance, setups, alerts, polices } = auth.data.accountDetails
            const {
               name,
               email,
               phoneNumber,
               picture,
               accountId,
               creationTime,
               updateTime,
               role,
            } = accountDetails
   
            return resolve({
               token: auth.data.token,
               accountDetails: {
                  name,
                  email,
                  phoneNumber,
                  picture,
                  accountId,
                  creationTime,
                  updateTime,
                  role,
                  primaryCommunication: 'string',
                  notshowtravelcard: account.notshowtravelcard,
                  notifications: {
                     notificationByPush: setups.notificationByPush,
                     notificationByEmail: setups.notificationByEmail,
                     notificationByPhone: setups.notificationByPhone,
                     notificationByWhatsapp: setups.notificationByWhatsapp
                  },
                  accountBalance: balance.available,
                  defaultIdiom: setups.lang,
                  defaultCurrency: setups.currency,
                  alerts: alerts.filter(alert => alert.readed === false),
                  polices: polices
               }
            })
         } catch (error) {
            return reject(error)
         }
      })
   }

   async SendPasswordRecoveryToken(payload) {
      return new Promise(async(resolve, reject) => {
         try {
            const sendPasswordRecoveryToken = await api.post('/api/Security/SendPasswordRecoveryToken', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*'
                  },
               },
            )
            return resolve(sendPasswordRecoveryToken.data)
         } catch(error) {
            return reject(error)
         }
      })
   }

   
}

export { HelpersSecurity };



