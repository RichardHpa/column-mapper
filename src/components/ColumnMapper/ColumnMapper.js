import MapperWizard, { WizardPage } from './components/MapperWizard'
import { Field } from 'react-final-form'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const onSubmit = async (values) => {
	await sleep(300)
	window.alert(JSON.stringify(values, 0, 2))
}

const ColumnMapper = () => {
	return (
		<MapperWizard
			initialValues={{
				headingRow: 1,
				dataRow: 2,
			}}
			submitForm={onSubmit}>
			<WizardPage>
				<div>
					<label>Email</label>
					<Field
						name="email"
						component="input"
						type="email"
						placeholder="Email"
					/>
				</div>
				<div>
					<label>Favorite Color</label>
					<Field name="favoriteColor" component="select">
						<option />
						<option value="#ff0000">❤️ Red</option>
						<option value="#00ff00">💚 Green</option>
						<option value="#0000ff">💙 Blue</option>
					</Field>
				</div>
			</WizardPage>

			<WizardPage>
				<div>
					<label>Email2</label>
					<Field
						name="email2"
						component="input"
						type="email"
						placeholder="Email"
					/>
				</div>
			</WizardPage>
		</MapperWizard>
	)
}

export default ColumnMapper
