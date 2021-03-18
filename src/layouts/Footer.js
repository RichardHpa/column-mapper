import { Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: 'auto',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[800],
	},
}))

export default function Footer() {
	const classes = useStyles()
	return (
		<footer className={classes.footer}>
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					Your Website
				</Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		</footer>
	)
}
