import { FunctionalComponent, h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { GameTypeEnum } from "src/utils";
import { fetchLeaderboard } from "src/api";

type Props = {
  gameType: GameTypeEnum;
  scoreId: string; // id of the score the user just created
};

const Leaderboard: FunctionalComponent<Props> = (props: Props) => {
  const { gameType, scoreId } = props;

  // const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryFn: fetchLeaderboard,
    queryKey: ["scores"],
  });

  const mutation = useMutation({
    mutationFn: (username: string) => {
      return axios.put(`http://127.0.0.1:3000/scores/${scoreId}`, {
        username,
      });
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

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
        {isError ? "error !" : null}
        {data
          ? data.data.data.map((it: any, i: number) => {
              return (
                <div style={{ ...styles.leaderboardRow }}>
                  {it.id === scoreId ?? "!"}
                  <div style={{ minWidth: "2rem" }}>{i + 1}.</div>{" "}
                  <div style={{ flex: "1", textAlign: "center" }}>
                    {it.username}
                  </div>
                  <div style={{ minWidth: "4rem", textAlign: "right" }}>
                    {it.score}
                  </div>
                  {it.id === scoreId ?? "!"}
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
