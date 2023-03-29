import { FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactGA from "react-ga";
ReactGA.initialize(`${process.env.GOOGLE_TAG_ID}`);

import RegularGame from "src/routes/regular";
import PracticeGame from "src/routes/practice";
import TimedGame from "src/routes/timed";
import Home from "src/routes/home";
import About from "src/routes/about";
import NotFoundPage from "src/routes/notfound";
import Footer from "./footer";

import { colors } from "src/style";

const queryClient = new QueryClient();

const App: FunctionalComponent = () => {
  return (
    <div
      id="preact_root"
      style={{ ...styles.mainContainer, justifyContent: "center" }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/regular" component={RegularGame} />
          <Route path="/practice" component={PracticeGame} />
          <Route path="/timed" component={TimedGame} />
          <Route path="/about" component={About} />
          <NotFoundPage default />
        </Router>
      </QueryClientProvider>
      <Footer />
    </div>
  );
};

export default App;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: "10px",
    color: colors.white,
  },
};
