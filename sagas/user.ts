import { call, put, takeEvery } from 'redux-saga/effects'
import { SIGN_USER_IN } from '../constants';
import firebase from "../container/firebase";
import { setUserInfo } from '../actions';
import { AnyAction } from 'redux';

function* signUserIn({ value: type }: AnyAction) {
    let provider: firebase.auth.AuthProvider;

    switch (type) {
        case "google":
            provider = new firebase.auth.GoogleAuthProvider();
            break;
        case "facebook":
            provider = new firebase.auth.FacebookAuthProvider();
            break;
    }

    try {
        yield call(async () =>
            await firebase.auth().signInWithPopup(provider)
        );
    } catch { }

    const { currentUser: player } = firebase.auth();

    if (!player) {
        return;
    }

    const playerInfo = {
        name: player.displayName,
        avatarURL: player.photoURL,
    };

    yield call(async () =>
        await firebase.firestore().collection("players").doc(player.uid).update(playerInfo)
    );

    yield put(setUserInfo(playerInfo));
}

function* userSaga() {
    yield takeEvery(SIGN_USER_IN, signUserIn);
}

export default userSaga;
