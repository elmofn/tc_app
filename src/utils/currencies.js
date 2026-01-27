import { CountryInfo, isoCodes } from './iso-code-list'

const currencyAndSymbol = ['currency', 'symbol']
const allSearchParams = currencyAndSymbol.concat(['countryName', 'dateFormat'])

export const getAllISOCodes = function (){
	const keys = Object.keys(isoCodes)

	return keys.map(function (key) {
		const ISOObject = isoCodes[key]

		return {
			iso: key,
			currency: ISOObject.currency,
			symbol: ISOObject.symbol,
			countryName: ISOObject.countryName,
			dateFormat: ISOObject.dateFormat,
			numericCode: ISOObject.numericCode,
		}
	})
}

export const getAllInfoByISO = function (isoCode) {
	const iso = isoCode.toUpperCase()

	if (Object.prototype.hasOwnProperty.call(isoCodes, iso)) {
		const ISOObject = isoCodes[iso]

		return {
			currency: ISOObject.currency,
			symbol: ISOObject.symbol,
			countryName: ISOObject.countryName,
			dateFormat: ISOObject.dateFormat,
			numericCode: ISOObject.numericCode,
		}
	}
	throw new Error('ISO2 was not')
}

export const getParamByISO = function (
	iso,
	param
) {
	checkParam(param, allSearchParams)

	if (Object.prototype.hasOwnProperty.call(isoCodes, iso.toUpperCase())) {
		return isoCodes[iso.toUpperCase()][param] || ''
	}

	throw new Error('ISO2 was not')
}

export const getISOByParam = function (
	param,
	value
){
	checkParam(param, allSearchParams)

	for (const key in isoCodes) {
		if (Object.prototype.hasOwnProperty.call(isoCodes, key) && isoCodes[key][param] === value) {
			return key
		}
	}
	return ''
}

export const getParamByParam = function (
	givenParam,
	givenParamValue,
	searchParam
){
	checkParam(givenParam, allSearchParams)
	checkParam(searchParam, allSearchParams)

	for (const key in isoCodes) {
		if (
			Object.prototype.hasOwnProperty.call(isoCodes, key) &&
			isoCodes[key][givenParam] === givenParamValue
		) {
			return isoCodes[key][searchParam] || ''
		}
	}
	throw new Error(givenParam + ' was not found in ' + givenParamValue)
}

export const getAllCountriesByCurrencyOrSymbol = function (
	param,
	value
){
	const countriesArray = []

	checkParam(param, currencyAndSymbol)

	for (const key in isoCodes) {
		if (Object.prototype.hasOwnProperty.call(isoCodes, key) && isoCodes[key][param] === value) {
			countriesArray.push(isoCodes[key].countryName)
		}
	}

	if (countriesArray.length === 0) {
		throw new Error(value + ' was not found in' + param)
	}

	return countriesArray
}

export const getAllISOByCurrencyOrSymbol = function (
	param,
	value
){
	const ISOArray = []

	checkParam(param, currencyAndSymbol)

	for (const key in isoCodes) {
		if (Object.prototype.hasOwnProperty.call(isoCodes, key) && isoCodes[key][param] === value) {
			ISOArray.push(key)
		}
	}

	if (ISOArray.length === 0) {
		throw new Error(value + ' was not found in' + param)
	}

	return ISOArray
}

function checkParam(param, paramArray) {
	if (paramArray.indexOf(param) === -1) {
		throw new Error('Invalid search param')
	}
}
