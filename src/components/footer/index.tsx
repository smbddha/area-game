import { h } from "preact";
import { colors } from "src/style";

const Footer = () => {
  return (
    <div style={{ ...styles.footerStyle }}>
      made with <a href="https://littlepurpose.dev">little purpose</a>
    </div>
  );
};

export default Footer;

const styles = {
  footerStyle: {
    margin: "auto",
    width: "50%",
    fontWeight: "300",
    fontSize: 10,
    color: colors.white,
    textAlign: "center",
    marginBottom: "8px",
  },
};
