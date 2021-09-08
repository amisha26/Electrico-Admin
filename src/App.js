import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./comp/Login";
import Header from "./comp/Header";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
