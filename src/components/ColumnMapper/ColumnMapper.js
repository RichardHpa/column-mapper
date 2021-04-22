import MapperWizard from './components/MapperWizard'

import { FormDataProvider } from './FormDataContext'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const onSubmit = async (values) => {
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
