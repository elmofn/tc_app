import api from "../api";

// Storage 
import { StorageAdapter } from '../../utils'
const storage = new StorageAdapter()

class HelpersAccount {
   async GetAccountByCode(code) {
      return new Promise(async (resolve, reject) => {
         try {
            const getAccountByCode = await api.get('/api/Account/GetAccountByCode?code=' + code,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            storage.set('auth-token', { token: getAccountByCode.data.token })

            const { accountDetails, account, balance, setups, alerts, polices } = getAccountByCode.data
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
                  polices: polices.filter(police => police.readed === false)
               }
            })
         } catch (error) {
            return reject(error)
         }
      })
   }

   async GetAccount(Id) {
      return new Promise(async (resolve, reject) => {
         try {
            const getAccount = await api.get('/api/Account/GetAccount?AccountId=' + Id,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            const { accountDetails, account, balance, setups, alerts, polices } = getAccount.data
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
                  polices: polices.filter(police => police.readed === false)
               }
            })
         } catch (error) {
            return reject(error)
         }
      })
   }

   async CreateAccount(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const createAccount = await api.put('/api/Account/CreateAccount', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            storage.set('accountDetails', {
               accountDetails: createAccount.data.accountDetails,
            })

            return resolve({
               accountDetails: createAccount?.data?.accountDetails || "",
               result: createAccount.data.result || false,
               message: createAccount.data.message || ""
            })
         } catch (error) {
            console.log('a', error.response.data)
            return reject(error)
         }
      })
   }

   async UpdateAccount(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const updateAccount = await api.put('/api/Account/UpdateAccount', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            if (updateAccount.data.result === false) {
               throw new Error(updateAccount.data.message)
            }
            const accountDetails = (await storage.get('accountDetails'))

            storage.set('accountDetails', {
               ...accountDetails,
               ...updateAccount.data.accountDetails,
            })

            return resolve({
               ...accountDetails,
               ...updateAccount.data.accountDetails,
            })
         } catch (error) {
            return reject(error)
         }
      })
   }

   async getAccount(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const updateAccount = await api.put('/api/Account/UpdateAccount', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            if (updateAccount.data.result === false) {
               throw new Error(updateAccount.data.message)
            }
            const accountDetails = (await storage.get('accountDetails'))

            storage.set('accountDetails', {
               ...accountDetails,
               ...updateAccount.data.accountDetails,
            })

            return resolve({
               ...accountDetails,
               ...updateAccount.data.accountDetails,
            })
         } catch (error) {
            return reject(error)
         }
      })
   }

   async RequestValidationCode(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const requestValidationCode = await api.post('/api/Account/RequestValidationCode?accountId=' + payload, 0,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            resolve(requestValidationCode)
         } catch (error) {
            reject(error)
         }
      })
   }

   async ValidateCode(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const validateCode = await api.post('/api/Account/ValidateCode', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            resolve(validateCode.data)
         } catch (error) {
            reject(error)
         }
      })
   }

   async SetNewPasswordAccount(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const setNewPasswordAccount = await api.post('/api/Account/SetNewPasswordAccount', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                  },
               },
            )

            if (setNewPasswordAccount.data.result === false) {
               throw new Error(setNewPasswordAccount.data.message)
            }

            return resolve({
               success: setNewPasswordAccount.data.result
            })
         } catch (error) {
            return reject(error)
         }
      })
   }

   async SetAccountSetup(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const { token } = (await storage.get('auth-token'))

            const setAccountSetup = await api.post('/api/Account/SetAccountSetup', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Authorization': 'Bearer ' + token
                  },
               },
            )

            return resolve(setAccountSetup.data.message)
         } catch (error) {
            return reject(error.response.data)
         }
      })
   }

   async RemoveAccount(payload) {
      return new Promise(async (resolve, reject) => {
         try {
            const { token } = (await storage.get('auth-token'))

            const r = await api.post('/api/Account/RemoveAccount', payload,
               {
                  headers: {
                     'Content-Type': 'application/json',
                     'Access-Control-Allow-Origin': '*',
                     'Authorization': 'Bearer ' + token
                  },
               },
            )

            return resolve(true)
         } catch (error) {
            return reject(false)
         }
      })
   }
}

export { HelpersAccount };



