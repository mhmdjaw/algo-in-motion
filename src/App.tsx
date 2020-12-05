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
import Options from "./components/Options";
import Description from "./components/Desrcription";
import GraphTraversalVisualizer from "./components/visualizers/GraphTraversalVisualizer";
import TimesTablesVisualizer from "./components/visualizers/TimesTablesVisualizer";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Redirect exact from="/algorithms" to="/algorithms/quick-sort" />
      </Switch>
      <Route path="/algorithms/:algorithm">
        <NavBar>{}</NavBar>
        <Options />
        <Route path={["/algorithms/quick-sort", "/algorithms/merge-sort"]}>
          <SortingVisualizer />
        </Route>
        <Route path={["/algorithms/bfs", "/algorithms/dfs"]}>
          <GraphTraversalVisualizer />
        </Route>
        <Route path="/algorithms/times-tables">
          <TimesTablesVisualizer />
        </Route>
        <Description />
      </Route>
    </Router>
  );
};

export default App;
