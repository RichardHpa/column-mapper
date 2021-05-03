import React, { useState, useEffect } from 'react'
import {
	Grid,
	Button,
	makeStyles,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Box,
	Divider,
	Collapse,
	Table,
	TableBody,
	TableRow,
	TableCell,
	MenuItem,
	TableHead,
	Tabs,
	Tab,
	TextField,
} from '@material-ui/core'
import { Select, Autocomplete } from 'mui-rff'
import { Form } from 'react-final-form'
import PropTypes from 'prop-types'
import FileSetUpPage from '../FileSetUpPage'
import PreviewStep from '../PreviewStep'
import { useFormData } from '../../FormDataContext'
import SaveDialog from 'components/ColumnMapper/components/SaveDialog'

const useStyles = makeStyles((theme) => ({
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
	requiredColumn: {
		width: '40%',
	},
	selectColumn: {
		width: '60%',
	},
	buttonGroup: {
		'& > *:not(:first-child)': {
			marginLeft: theme.spacing(1),
		},
	},
}))

const MapperWizard = (props) => {
	const classes = useStyles()
	const { initialValues, children, submitForm } = props
	const [step, setStep] = useState(0)
	// const [formValues, setFormValues] = useState(initialValues || {})
	const [showSave, setShowSave] = useState(false)

	const [allPages, setAllPages] = useState([
		<FileSetUpPage
			label="Upload File"
			validate={(values) => {
				const errors = {}
				if (!values.file) {
					errors.file = 'Required'
				}
				return errors
			}}
		/>,
	])

	useEffect(() => {
		if (children && allPages.length === 1) {
			const childPages = React.Children.toArray(children)
			const list = allPages.concat(childPages)
			list.push(<PreviewStep label="Preview Data" />)
			setAllPages(list)
		}
	}, [children, allPages])

	const activePage = allPages[step]
	const isLastPage = step === allPages.length - 1
	const isFirstPage = step === 0

	const handleNextStep = (values) => {
		setStep(step + 1)
		// setFormValues(values)
	}

	const handlePrevStep = () => {
		setStep(step - 1)
	}

	const onSubmit = async (values) => {
		if (isLastPage) {
			submitForm(values)
		} else {
			handleNextStep(values)
		}
	}

	const validate = (values) => {
		return activePage.props.validate ? activePage.props.validate(values) : {}
	}

	const handleChange = (event, newValue) => {
		setStep(newValue)
	}

	return (
		<Box>
			<Stepper className={classes.stepper} alternativeLabel>
				<Step active={isFirstPage} completed={!isFirstPage}>
					<StepLabel>Upload Data</StepLabel>
				</Step>
				<Step active={!isFirstPage && !isLastPage} completed={isLastPage}>
					<StepLabel>Map Data</StepLabel>
				</Step>
				<Step active={isLastPage} completed={step > allPages.length}>
					<StepLabel>Preview Data</StepLabel>
				</Step>
			</Stepper>

			{Array.isArray(children) && !isFirstPage && !isLastPage && (
				<Box pb={4}>
					<Tabs
						value={step}
						indicatorColor="primary"
						variant="fullWidth"
						textColor="primary"
						onChange={handleChange}
						centered>
						{children.map((child, i) => {
							const result = child.props.label.replace(/([A-Z])/g, ' $1')
							const label = result.charAt(0).toUpperCase() + result.slice(1)
							return <Tab key={child.props.label} label={label} value={i + 1} />
						})}
					</Tabs>
				</Box>
			)}

			<Form
				onSubmit={onSubmit}
				// initialValues={formValues}
				initialValues={initialValues || {}}
				validate={validate}
				mutators={{
					setValue: (args, state, utils) => {
						utils.changeValue(state, args[0], () => args[1])
					},
				}}>
				{({ handleSubmit, submitting, values, form }) => {
					const { getState } = form
					return (
						<form onSubmit={handleSubmit} noValidate>
							<Grid container spacing={2} justify="space-between">
								<Grid item xs={12}>
									{React.cloneElement(activePage, {
										...activePage.props,
										values: values,
										form: form,
									})}
								</Grid>

								<Grid item>
									{!isFirstPage && (
										<Button variant="contained" onClick={handlePrevStep}>
											Prev
										</Button>
									)}
								</Grid>

								<Grid item>
									<Box className={classes.buttonGroup}>
										<Button
											variant="outlined"
											onClick={() => setShowSave(true)}
											disabled={isFirstPage}>
											Save Mapping
										</Button>
										<Button
											variant="contained"
											color="primary"
											type="submit"
											disabled={getState().invalid}>
											{isLastPage ? 'Submit Mapping' : 'Next'}
										</Button>
									</Box>
								</Grid>
							</Grid>
							<SaveDialog
								open={showSave}
								close={() => setShowSave(false)}
								form={form}
							/>
							{process.env.NODE_ENV === 'development' && (
								<pre>{JSON.stringify(values, 0, 2)}</pre>
							)}
						</form>
					)
				}}
			</Form>
		</Box>
	)
}

export default MapperWizard

function Page(props) {
	const { children, values, form, columns, label } = props
	const { formData } = useFormData()
	const classes = useStyles()

	useEffect(() => {
		if (formData.length && columns) {
			const obj = {}
			const headingRow = formData[0].map(function (value) {
				return value.toLowerCase()
			})
			columns.forEach((col) => {
				const key = col.key
				const label = col.label
				const found = headingRow.indexOf(label.toLowerCase())
				if (found !== -1 && values.map[key] === undefined) {
					obj[key] = {
						sheetHeading: label,
						sheetIndex: found,
					}
				}
			})
			form.mutators.setValue('map', {
				...obj,
				...values.map,
			})
		}
		// eslint-disable-next-line
	}, [])

	if (typeof children === 'function') {
		return children()
	}

	const handleChangeSelect = (name, value) => {
		form.mutators.setValue(name, value)
	}

	return (
		<Box>
			<Typography variant="h5" gutterBottom>
				{label}
			</Typography>
			<Box py={2}>
				<Divider />
			</Box>
			<Collapse in={Boolean(formData)}>
				{formData && (
					<Table>
						<TableHead>
							<TableRow>
								<TableCell className={classes.requiredColumn}>
									Required Column
								</TableCell>
								<TableCell className={classes.selectColumn}>
									Select Column
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{columns.map((column) => {
								const example =
									formData[values.dataRow - 1][
										values?.map[column.key]?.sheetIndex
									]

								return (
									<Row
										key={column.key}
										rowInfo={column}
										columns={formData[0]}
										changeSelect={handleChangeSelect}
										exampleData={example}
									/>
								)
							})}
						</TableBody>
					</Table>
				)}
			</Collapse>
		</Box>
	)
}

Page.propTypes = {
	children: PropTypes.any,
}

export const WizardPage = Page

const required = (value) => (value ? undefined : 'Required')

const Row = (props) => {
	const { rowLabel, columns, rowInfo, changeSelect, exampleData } = props
	return (
		<TableRow>
			<TableCell>{rowInfo.label}</TableCell>
			<TableCell>
				{columns.length > 10 ? (
					<Autocomplete
						label="Select Column to map"
						name={`map.${rowInfo.key}.sheetHeading`}
						options={columns}
						variant="outlined"
						onChange={(e, value) => {
							const lowerCaseCols = columns.map(function (value) {
								return value.toLowerCase()
							})
							const indexVal = lowerCaseCols.indexOf(value.toLowerCase())
							changeSelect(`map.${rowInfo.key}`, {
								sheetHeading: value,
								sheetIndex: indexVal,
							})
						}}
						renderInput={(params) => {
							return (
								<TextField
									{...params}
									variant="outlined"
									label="Select Column to map"
								/>
							)
						}}
					/>
				) : (
					<Select
						variant="outlined"
						required={rowInfo.required}
						fieldProps={{ validate: rowInfo.required ? required : null }}
						name={`map.${rowInfo.key}.sheetHeading`}
						label="Select Column to map"
						formControlProps={{ margin: 'none' }}
						renderValue={(val) => val.toLowerCase()}
						onChange={(e) => {
							const { value } = e.target
							const lowerCaseCols = columns.map(function (value) {
								return value.toLowerCase()
							})
							const indexVal = lowerCaseCols.indexOf(value.toLowerCase())
							changeSelect(`map.${rowInfo.key}`, {
								sheetHeading: value,
								sheetIndex: indexVal,
							})
						}}>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{columns.map((col, i) => {
							return (
								<MenuItem value={col.toLowerCase()} key={`${rowLabel}-${col}`}>
									{col}
								</MenuItem>
							)
						})}
					</Select>
				)}
				{exampleData !== undefined && (
					<Typography variant="caption" color="textSecondary">
						Example data: {exampleData.toString()}
					</Typography>
				)}
			</TableCell>
		</TableRow>
	)
}
