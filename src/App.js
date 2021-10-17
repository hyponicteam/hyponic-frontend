import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { APP_ROUTE } from "./routes";
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";

export const history = createBrowserHistory();

const App = () => {
  return (
    <Router>
      <Switch>
        {APP_ROUTE.map((value, index) => {
          if (value.private) {
            return <PrivateRoute key={value.name} component={value.component} path={value.path} exact={value.exact} />;
          } else {
            return <PublicRoute key={value.name} restricted={value.restricted} path={value.path} component={value.component} exact={value.exact} />;
          }
        })}
      </Switch>
    </Router>
  );
};

export default App;
