import React, { useState } from 'react'
import {
	makeStyles,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Button,
	Typography,
	Box,
} from '@material-ui/core'
import Upload from './components/Upload'

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

const steps = ['upload file', 'Column mapping', 'Preview']

function getStepContent(step) {
	switch (step) {
		case 0:
			return <Upload />
		case 1:
			return 'Column mapping'
		case 2:
			return 'Preview'
		default:
			throw new Error('Unknown step')
	}
}

export default function Home() {
	const classes = useStyles()
	const [activeStep, setActiveStep] = useState(0)

	const handleNext = () => {
		setActiveStep(activeStep + 1)
	}

	const handleBack = () => {
		setActiveStep(activeStep - 1)
	}
	return (
		<Box>
			<Typography component="h1" variant="h4" align="center">
				Column Mapping Example
			</Typography>
			<Paper className={classes.paper}>
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
								Thank you for your order.
							</Typography>
							<Typography variant="subtitle1">
								Your order number is #2001539. We have emailed your order
								confirmation, and will send you an update when your order has
								shipped.
							</Typography>
						</React.Fragment>
					) : (
						<React.Fragment>
							{getStepContent(activeStep)}

							<div className={classes.buttons}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} className={classes.button}>
										Back
									</Button>
								)}
								<Button
									variant="contained"
									color="primary"
									onClick={handleNext}
									className={classes.button}>
									{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
								</Button>
							</div>
						</React.Fragment>
					)}
				</React.Fragment>
			</Paper>
		</Box>
	)
}
