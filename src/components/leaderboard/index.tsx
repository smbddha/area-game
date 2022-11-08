import { FunctionalComponent, h, Fragment, JSX } from "preact";
import { useEffect, useRef, useCallback, useState } from "preact/hooks";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GameTypeEnum } from "src/utils";
import { fetchLeaderboard } from "src/api";

type Props = {
  gameType: GameTypeEnum;
  scoreId: string; // id of the score the user just created
};

const Leaderboard: FunctionalComponent<Props> = (props: Props) => {
  const { gameType, scoreId } = props;
  const [username, setUsername] = useState<string>("");

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["scores", gameType],
    queryFn: () => fetchLeaderboard(gameType),
  });

  const mutation = useMutation({
    mutationKey: ["username"],
    mutationFn: () => setUsername(username),
  });

  const _debounce = (f: () => void) => {
    let timer: ReturnType<typeof setTimeout> | null;
    return function (...args: []) {
      //@ts-ignore
      const context: any = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        f.apply(context, args);
      }, 2000);
    };
  };

  const updateUsername = (name: string) => {
    mutation.mutate();
  };

  //@ts-ignore
  const debounceInput = useCallback(_debounce(updateUsername), []);

  const handleEdit = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    if (!e.target) return;

    setUsername(e.target.value);
    debounceInput(e.target.value);
  };

  const renderEditUsername = () => {
    return (
      <input
        type="text"
        id="username"
        name="username"
        placeholder="enter your name"
        value={username}
        onChange={handleEdit}
        style={{ textAlign: "center" }}
      />
    );
  };

  return (
    <>
      <div style={{ ...styles.leaderboardContainer }}>
        <div
          style={{
            width: "100%",
            textAlign: "left",
            fontSize: "1.8em",
            paddingBottom: "0.5rem",
          }}
        >
          Leaderboard
        </div>
        {isLoading ? "loading..." : null}
        {isError ? "error fetching leaderboard" : null}
        {data
          ? data.data.data.map((it: any, i: number) => {
              return (
                <div style={{ ...styles.leaderboardRow }}>
                  <div style={{ minWidth: "2rem", textAlign: "center" }}>
                    {it.id === scoreId && "!"}
                  </div>
                  <div style={{ minWidth: "2rem" }}>{i + 1}.</div>{" "}
                  <div style={{ flex: "1", textAlign: "center" }}>
                    {it.id === scoreId ? renderEditUsername() : it.username}
                  </div>
                  <div style={{ minWidth: "4rem", textAlign: "right" }}>
                    {it.score}
                  </div>
                  <div style={{ minWidth: "2rem", textAlign: "center" }}>
                    {it.id === scoreId && "!"}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Leaderboard;

const styles = {
  leaderboardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    width: "90%",
    gap: "0.3rem",
  },
  leaderboardRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    fontSize: "1.2em",
  },
};
