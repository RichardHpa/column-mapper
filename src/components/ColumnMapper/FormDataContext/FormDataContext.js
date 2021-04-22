import { createContext, useContext, useState } from 'react'
import XLSX from 'xlsx'

const FormDataContext = createContext({
	formData: {},
	setForm: null,
})

const useFormData = () => useContext(FormDataContext)

function FormDataProvider({ children }) {
	const [formData, _setFormData] = useState({})

	const setFormData = (file) => {
		if (file) {
			const reader = new FileReader()
			const rABS = !!reader.readAsBinaryString
			reader.onload = ({ target: { result } }) => {
				const wb = XLSX.read(result, { type: rABS ? 'binary' : 'array' })
				const wsname = wb.SheetNames[0]
				const ws = wb.Sheets[wsname]
				const jsonData = XLSX.utils.sheet_to_json(ws, {
					header: 1,
				})
				_setFormData(jsonData)
			}
			if (rABS) reader.readAsBinaryString(file)
			else reader.readAsArrayBuffer(file)
		}
	}

	const contextValue = {
		formData: formData,
		setForm: setFormData,
	}

	return (
		<FormDataContext.Provider value={contextValue}>
			{children}
		</FormDataContext.Provider>
	)
}
export { FormDataProvider, useFormData }
