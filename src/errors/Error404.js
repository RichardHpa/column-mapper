import { Paper, Typography, makeStyles, Box, Button } from '@material-ui/core'
import { useLocation, Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	main: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
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

export default function Error404() {
	const classes = useStyles()
	let location = useLocation()

	return (
		<div className={classes.main}>
			<Box width="100%">
				<Paper className={classes.paper} elevation={0}>
					<Typography variant="h3" align="center">
						404
					</Typography>
					<Typography align="center">
						No match for <code>{location.pathname}</code>
					</Typography>
					<Box display="flex" justifyContent="center" p={2}>
						<Button
							variant="contained"
							color="primary"
							disableElevation
							component={Link}
							to="/">
							Go home
						</Button>
					</Box>
				</Paper>
			</Box>
		</div>
	)
}
