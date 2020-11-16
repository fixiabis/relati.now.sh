import { NextPage } from "next";
import { Page, Button, IconButton } from "../components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "axios";
import firebase from "../container/firebase";
import { useSelector } from "react-redux";
import { State, UserState } from "../container/store";
import { GameRoundInfo } from "../types";
import { LeaveWaitingMessageBox } from "../page-components/wait-for-opponent";

const roundsCollection = firebase.firestore().collection("rounds");

export interface Props {
  type?: string;
}

const WaitForOpponent: NextPage<Props> = ({ type = "x9" }) => {
  const router = useRouter();
  const playerInfo = useSelector<State, UserState["userInfo"]>(state => state.user.userInfo);
  const playerId = playerInfo?.playerId;
  const [isLeaveWaitingMessageBoxOpen, setIsLeaveWaitingMessageBoxOpen] = useState(false);
  const [{ roundId, isRoundReady }, setRoundState] = useState({ roundId: "", isRoundReady: false });
  const setRoundId = (roundId: string) => setRoundState({ roundId, isRoundReady });
  const setIsRoundReady = (isRoundReady: boolean) => setRoundState({ roundId, isRoundReady });
  const openLeaveWaitingMessageBox = () => setIsLeaveWaitingMessageBoxOpen(true);
  const closeLeaveWaitingMessageBox = () => setIsLeaveWaitingMessageBoxOpen(false);

  const leavePage = () => {
    Axios.put(`/api/game/isOver?roundId=${roundId}&playerId=${playerId}`).then(() => {
      router.replace("/choose-mode?for=game");
    });
  };

  useEffect(() => {
    if (!playerInfo) {
      router.replace(`/choose-mode?for=sign-in&then=/wait-for-opponent?on=${type}`);
      return;
    }

    if (isRoundReady) {
      router.replace(`/play?2p-online&on=${type}&at=${roundId}`);
      return;
    }

    if (roundId) {
      const abortForSnapshotHandling = (
        roundsCollection.doc(roundId).onSnapshot(roundSnapshot => {
          const { playerX } = roundSnapshot.data() as GameRoundInfo;

          if (playerX && !isRoundReady) {
            setIsRoundReady(true);
          }
        })
      );

      return abortForSnapshotHandling;
    }
    else {
      Axios.post("/api/game", { type, playerId }).then(response => {
        const { roundId, playerX } = response.data;

        if (playerX) {
          setRoundState({ isRoundReady: true, roundId });
        }
        else {
          setRoundId(roundId);
        }
      });
    }
  });

  return (
    <Page id="wait-for-opponent" title="wait for opponent">
      <div className="loading">
        <div className="main-icon rotate" style={{ backgroundImage: `url(/icons/loading.svg)` }} />
        正在等待對手
      </div>

      <LeaveWaitingMessageBox
        show={isLeaveWaitingMessageBoxOpen}
        onCancel={closeLeaveWaitingMessageBox}
        onAccept={leavePage}
        onReject={closeLeaveWaitingMessageBox} />

      <Button.Group>
        <IconButton type="leave" color="#888" title="離開" onClick={openLeaveWaitingMessageBox} />
      </Button.Group>
    </Page >
  );
};

WaitForOpponent.getInitialProps = async ({ query: { on: type } }) => {
  return {
    type: type as string | undefined,
  };
};

export default WaitForOpponent;
