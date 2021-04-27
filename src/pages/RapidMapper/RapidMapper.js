import { useEffect } from 'react'
import { makeStyles, Paper, Typography, Box } from '@material-ui/core'
import ColumnMapper from 'components/ColumnMapper'
// import { WizardPage } from 'components/ColumnMapper/components/MapperWizard'
import { useRapidService } from '../../services/RapidService'

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

const RapidMapper = () => {
	const classes = useStyles()
	const RapidService = useRapidService()

	useEffect(() => {
		async function fetchMyAPI() {
			const response = await RapidService.getTestData()
			console.log(response)
		}
		fetchMyAPI()
		// eslint-disable-next-line
	}, [])

	return (
		<Box>
			<Typography component="h1" variant="h4" align="center">
				Rapid Column Mapping Example
			</Typography>
			<Paper className={classes.paper}>
				<ColumnMapper>
					{/* <WizardPage columns={basicCols} label="Map Product Data" /> */}

					{/* <WizardPage columns={page2Cols} label="Map Product Time Data" /> */}
				</ColumnMapper>
			</Paper>
		</Box>
	)
}

export default RapidMapper
