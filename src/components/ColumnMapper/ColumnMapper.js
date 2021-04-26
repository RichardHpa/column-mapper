import MapperWizard from './components/MapperWizard'

import { FormDataProvider } from './FormDataContext'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const onSubmit = async (values) => {
	if (values.saveMapping) {
		const newMap = values
		delete newMap['file']
		const savedMaps = JSON.parse(localStorage.getItem('columnMapper')) || []
		savedMaps.push(newMap)
		localStorage.setItem('columnMapper', JSON.stringify(savedMaps))
	}

	await sleep(300)
	window.alert(JSON.stringify(values, 0, 2))
}

const ColumnMapper = (props) => {
	const { children } = props
	return (
		<FormDataProvider>
			<MapperWizard
				initialValues={{
					headingRow: 1,
					dataRow: 2,
					map: {},
				}}
				submitForm={onSubmit}>
				{children}
			</MapperWizard>
		</FormDataProvider>
	)
}

export default ColumnMapper
