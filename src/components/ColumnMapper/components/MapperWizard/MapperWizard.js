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
} from '@material-ui/core'
import { Select } from 'mui-rff'
import { Form } from 'react-final-form'
import PropTypes from 'prop-types'
import FileSetUpPage from '../FileSetUpPage'
import PreviewStep from '../PreviewStep'
import { useFormData } from '../../FormDataContext'

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
}))

const MapperWizard = (props) => {
	const classes = useStyles()
	const { initialValues, children, submitForm } = props
	const [step, setStep] = useState(0)

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

	const handleNextStep = () => {
		if (isLastPage) {
		}
		setStep(step + 1)
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

	return (
		<Box>
			<Stepper activeStep={step} className={classes.stepper} alternativeLabel>
				{allPages.map((page, i) => (
					<Step key={page.props.label || `step-${i + 1}`}>
						<StepLabel>{page.props.label || `Step ${i + 1}`}</StepLabel>
					</Step>
				))}
			</Stepper>

			<Form
				onSubmit={onSubmit}
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
						<form onSubmit={handleSubmit}>
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
									<Button
										variant="contained"
										color="primary"
										type="submit"
										disabled={getState().invalid}>
										{isLastPage ? 'Submit Mapping' : 'Next'}
									</Button>
								</Grid>
							</Grid>
							<pre>{JSON.stringify(values, 0, 2)}</pre>
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
				<Select
					variant="outlined"
					fieldProps={{ validate: rowInfo.required ? required : null }}
					name={`map.${rowInfo.key}.sheetHeading`}
					label="Select Column to map"
					formControlProps={{ margin: 'none' }}
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
					{columns.map((col, i) => {
						return (
							<MenuItem value={col.toLowerCase()} key={`${rowLabel}-${col}`}>
								{col}
							</MenuItem>
						)
					})}
				</Select>
				{exampleData !== undefined && (
					<Typography variant="caption" color="textSecondary">
						Example data: {exampleData.toString()}
					</Typography>
				)}
			</TableCell>
		</TableRow>
	)
}
