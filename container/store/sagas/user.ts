import { call, put, takeEvery } from 'redux-saga/effects'
import { SIGN_USER_IN } from '../constants';
import firebase from "../../firebase";
import { setUserInfo } from '../actions';
import { AnyAction } from 'redux';

function* signUserIn({ value: type }: AnyAction) {
    if (!firebase.auth().currentUser) {
        let provider: firebase.auth.AuthProvider;

        switch (type) {
            case "google":
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case "facebook":
                provider = new firebase.auth.FacebookAuthProvider();
                break;
        }

        // yield call(async () => 
        //     await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        // );

        try {
            yield call(async () =>
                await firebase.auth().signInWithPopup(provider)
            );
        } catch { }
    }

    const { currentUser: player } = firebase.auth();

    if (!player) {
        return;
    }

    const playerInfo = {
        playerId: player.uid,
        name: player.displayName,
        avatarURL: player.photoURL,
    };

    yield call(async () =>
        await firebase.firestore().collection("players").doc(player.uid).set(playerInfo)
    );

    yield put(setUserInfo(playerInfo));
}

function* userSaga() {
    yield takeEvery(SIGN_USER_IN, signUserIn);
}

export default userSaga;
