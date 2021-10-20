import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import React from "react";
import Home from "./Components/Tutorial";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/Tutorial" component={Tutorial} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
