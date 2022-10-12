import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";

import RegularGame from "src/routes/regular";
import PracticeGame from "src/routes/practice";
import Home from "src/routes/home";
import NotFoundPage from "src/routes/notfound";
import Footer from "./footer";

const App: FunctionalComponent = () => {
  return (
    <div id="preact_root" style={{ height: "100%" }}>
      <Router>
        <Route path="/" component={Home} />
        <Route path="/regular" component={RegularGame} />
        <Route path="/practice" component={PracticeGame} />
        <NotFoundPage default />
      </Router>
      <Footer />
    </div>
  );
};

export default App;
