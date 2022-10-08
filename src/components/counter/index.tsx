import { FunctionalComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { animate } from "framer-motion";

type Props = { from: number; to: number };

const Counter = (props: Props) => {
  const { from, to } = props;
  const nodeRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const node: HTMLDivElement | undefined = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <div ref={nodeRef} />;
};

export default Counter;
