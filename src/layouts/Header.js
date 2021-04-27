import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Button,
} from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	heading: {
		textDecoration: 'none',
		flexGrow: 1,
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}))

export default function Header() {
	const classes = useStyles()
	return (
		<>
			<AppBar position="fixed" color="default" className={classes.appBar}>
				<Toolbar>
					<Typography
						className={classes.heading}
						variant="h6"
						color="inherit"
						noWrap
						component={RouterLink}
						to="/">
						Column Mapping Example
					</Typography>
					<Button color="inherit" component={RouterLink} to="/demo">
						Basic Demo
					</Button>

					<Button color="inherit" component={RouterLink} to="/rapid">
						Rapid Demo
					</Button>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar} />
		</>
	)
}
