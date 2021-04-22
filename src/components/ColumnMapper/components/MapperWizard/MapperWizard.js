import React, { useState, useEffect } from 'react'
import { Grid, Button } from '@material-ui/core'
import { Form } from 'react-final-form'
import PropTypes from 'prop-types'
import FileSetUpPage from '../FileSetUpPage'
import PreviewStep from '../PreviewStep'

const MapperWizard = (props) => {
	const { initialValues, children, submitForm } = props
	const [step, setStep] = useState(0)
	const [allPages, setAllPages] = useState([<FileSetUpPage />])

	useEffect(() => {
		if (children) {
			const childPages = React.Children.toArray(children)
			const list = allPages.concat(childPages)
			list.push(<PreviewStep />)
			setAllPages(list)
		}
	}, [])

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
		console.log('submitting')
		if (isLastPage) {
			submitForm(values)
		} else {
			handleNextStep(values)
		}
	}

	return (
		<Form
			onSubmit={onSubmit}
			initialValues={initialValues || {}}
			mutators={{
				setFieldValue: (args, state, utils) => {
					utils.changeValue(state, args[0], () => args[1])
				},
			}}>
			{({ handleSubmit, submitting, values }) => {
				return (
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2} justify="space-between">
							<Grid item xs={12}>
								{React.cloneElement(activePage, {})}
							</Grid>
							<Grid item>
								<Button variant="contained" onClick={handlePrevStep}>
									Prev
								</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									type="submit"
									// onClick={handleNextStep}
								>
									Next
								</Button>
							</Grid>
						</Grid>
						<pre>{JSON.stringify(values, 0, 2)}</pre>
					</form>
				)
			}}
		</Form>
	)
}

export default MapperWizard

function Page(props) {
	const { children } = props
	return <>{children}</>
}

Page.propTypes = {
	children: PropTypes.any,
}

Page.myPage = ({
	children,
	mutators,
	values,
	handlePrevStep,
	handleNextStep,
}) => {
	if (typeof children === 'function') {
		return children(mutators, values, handlePrevStep, handleNextStep)
	}
	return children
}

export const WizardPage = Page.myPage
