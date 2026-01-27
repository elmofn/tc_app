import { maskList } from './phone-mask-list'

export const mask = (input, maskType) => {
	if (maskType === 'Phone') {
		let matrix = '+###############'

		maskList.forEach((item) => {
			const code = item.code.replace(/[\s#]/g, '')
			const phone = input.replace(/[\s#-)(]/g, '')

			if (phone.includes(code)) {
				matrix = item.code
			}
		})
		return replaceCharacters(input, matrix)
	}

	return replaceCharacters(input, maskType.valueOf())
}

const replaceCharacters = (value, matrix) => {
	let i = 0
	const val = value.replace(/\D/g, '')

	value = matrix.replace(/(?!\+)./g, (a) =>
		/[#\d]/.test(a) && i < val.length
			? val.charAt(i++)
			: i >= val.length
			? ''
			: a
	)
	return value
}

export const removeHtmlTags = (html) => {
	const regex = /<[^>]*>/g;
	return html.replace(regex, '');
  };
  