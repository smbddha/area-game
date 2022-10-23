import { FunctionalComponent, h, Fragment } from "preact";
import { colors } from "src/style";

const About: FunctionalComponent = () => {
  return (
    <div style={styles.mainContainer}>
      A small game made with little purpose. Hope you have fun !
    </div>
  );
};

export default About;

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",

    color: colors.white,
  },
};
