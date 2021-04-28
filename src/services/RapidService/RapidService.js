import axios from 'axios'

const simulateLoading = (ms) =>
	new Promise((resolve) => setTimeout(resolve, ms))

function formService() {
	return {
		/**
		 * @param {String} retailer - Which retailer you are wanting to get the data for Required
		 */
		async getTabs(retailer) {
			if (retailer === undefined) throw Error('Missing Retailer value')
			await simulateLoading(2000)
			return axios.get(`jsonFiles/tabdisplays/${retailer}.json`).then((res) => {
				return res.data
			})
		},

		/**
		 * @param {String} retailer - Which retailer you are wanting to get the data for Required
		 * @param {String} tab - Which Tab you are wanting to get the data for Required
		 */
		async getTabColumns(retailer, tab) {
			if (retailer === undefined) throw Error('Missing Retailer value')
			if (tab === undefined) throw Error('Missing Tab value')

			if (tab === 'ProductHierarchy') {
				tab = 'product-hierarchy'
			}

			const primaryData = await axios
				.get(`jsonFiles/rules/Primary/${tab.toLowerCase()}.json`)
				.then((res) => res.data)
			const retailerData = await axios
				.get(`jsonFiles/rules/${retailer}/${tab.toLowerCase()}.json`)
				.then((res) => res.data)

			const deepMergedData = mergeDeep(primaryData, retailerData)
			await simulateLoading(2000)
			return deepMergedData
		},
	}
}

function useRapidService() {
	return formService()
}

export { formService, useRapidService }

function isObject(item) {
	return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
	if (!sources.length) return target
	const source = sources.shift()

	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} })
				mergeDeep(target[key], source[key])
			} else {
				Object.assign(target, { [key]: source[key] })
			}
		}
	}

	return mergeDeep(target, ...sources)
}
