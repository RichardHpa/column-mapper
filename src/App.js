import Header from './layouts/Header'
import Footer from './layouts/Footer'
import { makeStyles, Container } from '@material-ui/core'
import Routes from './Routes'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},
	main: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
	},
}))

function App() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Header />
			<Container className={classes.main}>
				<Routes />
			</Container>
			<Footer />
		</div>
	)
}

export default App
