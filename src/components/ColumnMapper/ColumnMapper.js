import { useEffect } from 'react'
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
	const { children, initialValues } = props
	// console.log(children)
	useEffect(() => {
		if (!children) {
			throw new Error('No children have been given to Column Mapper')
		}
	}, [children])
	return (
		<FormDataProvider>
			<MapperWizard
				initialValues={{
					headingRow: 1,
					dataRow: 2,
					map: {},
					...initialValues,
				}}
				submitForm={onSubmit}>
				{/* {children.flat()} */}
				{Array.isArray(children) ? children.flat() : children}
			</MapperWizard>
		</FormDataProvider>
	)
}

export default ColumnMapper
