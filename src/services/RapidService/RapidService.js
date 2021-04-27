import axios from 'axios'

function formService() {
	return {
		async getTestData() {
			return axios.get('jsonFiles/tabdisplays/Foodstuffs.json').then((res) => {
				return res.data
			})
		},
	}
}

function useRapidService() {
	return formService()
}

export { formService, useRapidService }
