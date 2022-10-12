import { h } from "preact";
import { colors } from "src/style";

const Footer = () => {
  return (
    <div style={{ ...styles.footerStyle }}>
      made with <a>little purpose</a>
    </div>
  );
};

export default Footer;

const styles = {
  footerStyle: {
    fontWeight: "light",
    fontSize: 12,
    color: colors.white,
    position: "absolute",
    bottom: "20px",
  },
};
