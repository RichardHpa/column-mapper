import { Switch, Route } from 'react-router-dom';
import Error404 from './errors/Error404';
import Home from './pages/Home';
import DemoMapper from 'pages/DemoMapper';
import PricingMapper from 'pages/PricingMapper';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/demo">
        <DemoMapper />
      </Route>
      <Route exact path="/pricing">
        <PricingMapper />
      </Route>
      <Route path="*">
        <Error404 />
      </Route>
    </Switch>
  );
}
