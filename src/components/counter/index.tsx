import { FunctionalComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { animate } from "framer-motion";

type Props = { from: number; to: number; style: object };

const Counter = (props: Props) => {
  const { from, to, style } = props;
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node: HTMLDivElement | null = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <div style={{ ...style }} ref={nodeRef} />;
};

export default Counter;
