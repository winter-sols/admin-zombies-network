import { BrowserRouter, Switch, Route } from "react-router-dom"

import Auth from "routers/auth"
import Dashboard from "routers/dashboard"

import { ROUTERS } from "configurations/routers"

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTERS.HOME} render={() => <Dashboard />} />
      <Route path={ROUTERS.AUTH} component={Auth} />
      <Route path={ROUTERS.DASHBOARD} component={Dashboard} />
    </Switch>
  </BrowserRouter>
)

export default Router
