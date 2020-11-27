import React from "react";
import SortingVisualizer from "./components/visualizers/SortingVisualizer";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Redirect exact from="/algorithms" to="/algorithms/quick-sort" />
      </Switch>
      <Route path="/algorithms/:algorithm">
        <NavBar>{}</NavBar>
      </Route>
      <Route path="/algorithms/quick-sort" component={SortingVisualizer} />
    </Router>
  );
};

export default App;
