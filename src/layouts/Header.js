import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
}))

export default function Header() {
	const classes = useStyles()
	return (
		<>
			<AppBar position="fixed" color="default" className={classes.appBar}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Company name
					</Typography>
				</Toolbar>
			</AppBar>
			<div className={classes.toolbar} />
		</>
	)
}
