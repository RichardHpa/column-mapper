import React, { useState } from 'react'
import {
	makeStyles,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
	Box,
} from '@material-ui/core'
import Upload from '../Upload'
import ColumnMapper from '../ColumnMapper'

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
}))

const steps = ['Upload file', 'Column mapping', 'Preview']

const UploaderContainer = () => {
	const classes = useStyles()
	const [activeStep, setActiveStep] = useState(0)
	const [file, setFile] = useState(null)
	const [startMappingOptions, setStartMappingOptions] = useState({
		headingRow: 1,
		dataRow: 2,
		startColumn: 1,
	})

	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}

	const handleOnUpload = (data) => {
		setFile(data)
		handleNext()
	}

	const handleMappingOptions = (column, value) => {
		setStartMappingOptions({
			...startMappingOptions,
			[column]: value,
		})
	}

	function getStepContent(step) {
		switch (step) {
			case 0:
				return (
					<Upload
						file={file}
						onUpload={handleOnUpload}
						startMappingOptions={startMappingOptions}
						setMappingOptions={handleMappingOptions}
					/>
				)
			case 1:
				return (
					<ColumnMapper
						data={file}
						goBack={handleBack}
						currentMap={startMappingOptions}
						// startingColumn={startingColumn}
						requiredColumns={[
							'Product Id',
							'Name',
							'Price',
							'Size',
							'Department',
						]}
						// setFileData={handleSetFileData}
					/>
				)
			case 2:
				return 'Preview'
			default:
				throw new Error('Unknown step')
		}
	}
	return (
		<Box>
			<Stepper
				activeStep={activeStep}
				className={classes.stepper}
				alternativeLabel>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<React.Fragment>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography variant="h5" gutterBottom>
							All Done
						</Typography>
					</React.Fragment>
				) : (
					<React.Fragment>{getStepContent(activeStep)}</React.Fragment>
				)}
			</React.Fragment>
		</Box>
	)
}

export default UploaderContainer
