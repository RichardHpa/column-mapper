import { Switch, Route } from 'react-router-dom'
import Error404 from './errors/Error404'
import Home from './pages/Home'

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>
			<Route path="*">
				<Error404 />
			</Route>
		</Switch>
	)
}
