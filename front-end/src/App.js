import './App.css';
import Home from './HomePage/home.js';
import Form from './FormPage/form.js';
import Heatmap from './HeatmapPage/heatmap.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/form">
            <Form />
          </Route>

          <Route path="/heatmap">
            <Heatmap />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
