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
// import Upload from './components/Upload'
// import ColumnMapper from './components/ColumnMapper'
import UploaderContainer from './components/UploaderContainer'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	// stepper: {
	// 	padding: theme.spacing(3, 0, 5),
	// },
	// buttons: {
	// 	display: 'flex',
	// 	justifyContent: 'flex-end',
	// },
	// button: {
	// 	marginTop: theme.spacing(3),
	// 	marginLeft: theme.spacing(1),
	// },
}))

// const steps = ['Upload file', 'Column mapping', 'Preview']

export default function Home() {
	const classes = useStyles()
	// const [activeStep, setActiveStep] = useState(0)
	// const [file, setFile] = useState(null)
	// const [startingColumn, setStartingColumn] = useState(1)

	// const handleNext = () => {
	// 	setActiveStep(activeStep + 1)
	// }

	// const handleBack = () => {
	// 	setActiveStep(activeStep - 1)
	// }

	// const handleOnUpload = (data) => {
	// 	setFile(data.file)
	// 	setStartingColumn(data.startingColumn)
	// 	handleNext()
	// }

	// function getStepContent(step) {
	// 	switch (step) {
	// 		case 0:
	// 			return <Upload data={file} onUpload={handleOnUpload} />
	// 		case 1:
	// 			return (
	// 				<ColumnMapper
	// 					data={file}
	// 					goBack={handleBack}
	// 					startingColumn={startingColumn}
	// 					requiredColumns={['Product Id', 'Name', 'Price', 'Size', 'Type']}
	// 					// setFileData={handleSetFileData}
	// 				/>
	// 			)
	// 		case 2:
	// 			return 'Preview'
	// 		default:
	// 			throw new Error('Unknown step')
	// 	}
	// }

	return (
		<Box>
			<Typography component="h1" variant="h4" align="center">
				Column Mapping Example
			</Typography>
			<Paper className={classes.paper}>
				{/* <Stepper
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
								ALl Done
							</Typography>
						</React.Fragment>
					) : (
						<React.Fragment>{getStepContent(activeStep)}</React.Fragment>
					)}
				</React.Fragment> */}
				<UploaderContainer />
			</Paper>
		</Box>
	)
}
