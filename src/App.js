import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Register from "./Components/Register";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Home from "./Components/Home";
import React from "react";
import { createContext, useContext, useReducer } from "react";

//Context
export const AuthContext = createContext();

//inisialisasi
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.data.user.email));
      localStorage.setItem("token", JSON.stringify(action.payload.data.access_token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{ state, dispatch }}>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/Register" component={Register} /> */}
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Home" component={Home} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
