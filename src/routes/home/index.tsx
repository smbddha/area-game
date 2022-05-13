import { FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import style from "./style.css";

import Game from "src/components/shape";

const Home: FunctionalComponent = () => {
  const [area, setArea] = useState<number>(0);

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component. {area}</p>

      <Game />
    </div>
  );
};

export default Home;
