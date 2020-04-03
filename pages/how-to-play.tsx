import React, { useEffect } from "react";
import Page from "../components/Page";
import { State } from "../reducers/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { mainPageStopAnimation } from "../actions/page";
import Board from "../components/Board";
import "../styles/how-to-play.scss";
import Button from "../components/Button";
import { useRouter } from "next/router";

const HowToPlay = () => {
    const mainPageAnimation = useSelector<State>(state => state.page.main.animation);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (mainPageAnimation) {
            dispatch(mainPageStopAnimation());
        }
    }, [mainPageAnimation]);

    return (
        <Page id="how-to-play" title="How to play">
            <Board width={9} height={9} />
            <Button.Group>
                <Button style={{
                    backgroundColor: "#888",
                    backgroundImage: "url(/icons/leave.svg)"
                }} onClick={() => router.push("/")} />
            </Button.Group>
        </Page>
    );
};

export default HowToPlay;
