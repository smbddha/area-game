import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";

import { colors } from "src/style";

type Props = {
  onClick: () => void;
  title: string;
  style: object;
  color?: string;
  activeColor?: string;
  label?: string;
};

const BoxButton: FunctionalComponent<Props> = (props: Props) => {
  const { onClick, title, style, color, activeColor, label } = props;
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  return (
    <div style={styles.container}>
      <button
        style={{
          ...styles.button,
          ...style,
          // boxShadow: isActive ? "1px 1px 0px #9D9A9A" : "4px 4px 0px #9D9A9A"
        }}
        onClick={onClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {title}
      </button>
      <div style={styles.labelContainer}>
        <text>{label || null}</text>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // background: "#F68888",
    background: colors.background,
    border: `3px solid ${colors.white}`,
    width: 258,
    height: "100%",
    // height: 58,
    // boxShadow: "4px 4px 0px #9D9A9A",
    // color: "#EFEFEF",
    color: colors.white,
    fontSize: 40,
    textAlign: "center",
    paddingTop: 6,
    paddingBottom: 6,
  },
  labelContainer: {
    flex: 1,
    padding: "6px",
  },
  text: {},
};

export default BoxButton;
