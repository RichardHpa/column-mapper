import React from 'react'
import { makeStyles, Paper, Typography, Box } from '@material-ui/core'

// import UploaderContainer from './components/UploaderContainer'
import ColumnMapper from '../../components/ColumnMapper'

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

export default function Home() {
	const classes = useStyles()

	return (
		<Box>
			<Typography component="h1" variant="h4" align="center">
				Column Mapping Example
			</Typography>
			<Paper className={classes.paper}>
				{/* <UploaderContainer /> */}
				<ColumnMapper></ColumnMapper>
			</Paper>
		</Box>
	)
}
