import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/layout/navbar";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import dashboard from "./components/layout/dashboard";

class App extends Component {
  render() {
    return(
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={dashboard} />
        </div>
      </Router>
    )
  };
};

export default App;
