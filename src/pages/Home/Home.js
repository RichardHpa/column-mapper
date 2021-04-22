import React from 'react'
import { makeStyles, Paper, Typography, Box } from '@material-ui/core'
// import UploaderContainer from './components/UploaderContainer'
import ColumnMapper from '../../components/ColumnMapper'
import { WizardPage } from '../../components/ColumnMapper/components/MapperWizard'
// import { Field } from 'react-final-form'

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
}))

const basicCols = [
	{ key: 'productId', label: 'Product Id', required: true },
	{ key: 'name', label: 'Name', required: true },
	{ key: 'price', label: 'Price', required: true },
	{ key: 'size', label: 'Size', required: false },
	{ key: 'department', label: 'Department Name', required: true },
]

const page2Cols = [
	{ key: 'year', label: 'Year Released', required: true },
	{ key: 'code', label: 'Code', required: false },
	{ key: 'created', label: 'Created Date', required: true },
]

export default function Home() {
	const classes = useStyles()

	return (
		<Box>
			<Typography component="h1" variant="h4" align="center">
				Column Mapping Example
			</Typography>
			<Paper className={classes.paper}>
				{/* <UploaderContainer /> */}
				<ColumnMapper>
					<WizardPage columns={basicCols} label="Map Product Data" />

					<WizardPage columns={page2Cols} label="Map Product Time Data" />
				</ColumnMapper>
			</Paper>
		</Box>
	)
}
