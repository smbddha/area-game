import { FunctionalComponent, h } from 'preact';
import { Route, Router } from 'preact-router';

import RegularGame from 'src/routes/regular';
import Home from 'src/routes/home';
import NotFoundPage from 'src/routes/notfound';

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root">
      <Router style={{ height: "100%" }}>
        <Route path="/" component={Home} />
        <Route path="/regular" component={RegularGame} />
        <NotFoundPage default />
      </Router>
    </div>
  );
};

export default App;
