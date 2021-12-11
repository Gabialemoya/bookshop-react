import { takeLatest, call, all, put } from "redux-saga/effects";
import {
  auth,
  handleUserProfile,
  getCurrentUser,
  GoogleProvider,
} from "./../../firebase/utils";
import userTypes from "./user.types";
import {
  signInSuccess,
  signOutUserSuccess,
  resetPasswordSuccess,
  userError,
} from "./user.actions";
import { handleResetPasswordAPI } from "./user.helpers";
import { ui } from "../UI/ui.actions";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    yield put(ui.showLoader(true));
    const userRef = yield call(handleUserProfile, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();

    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    yield put(ui.showLoader(true));
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.log(err);
    const msgerror = "Email o contraseña incorrecta";
    yield put(ui.showMessage({ msg: msgerror, type: "error" }));
  } finally {
    yield put(ui.showLoader(false));
  }
}

//generator function
export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    yield put(ui.showLoader(true));
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield put(ui.showLoader(true));
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({
  payload: { displayName, email, password, confirmPassword },
}) {
  /* if (password !== confirmPassword) {
    const err = ["Las contraseñas no coinciden"];
    yield put(userError(err));
    return;
  } else if (password === confirmPassword) {
    const err = [];
    yield put(userError(err));
  } */

  try {
    yield put(ui.showLoader(true));
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    const additionalData = { displayName };

    yield getSnapshotFromUserAuth(user, additionalData);
    yield put(ui.showMessage({ msg: "REGISTRO REALIZADO", type: "success" }));
  } catch (err) {
    console.log(err);
    yield put(
      ui.showMessage({ msg: "NO SE PUDO REALIZAR EL REGISTRO", type: "error" })
    );
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield put(ui.showLoader(true));
    //yield permite que se pueda ejecutar la promise
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
    yield put(
      ui.showMessage({
        msg: "SE ENVIO EMAIL PARA RESTAURAR CONTRASEÑA",
        type: "info",
      })
    );
  } catch (err) {
    console.log(err);
    yield put(userError(err));
    yield put(
      ui.showMessage({
        msg: "NO SE PUDO ENVIAR MAIL PARA RESTAURAR CONTRASEÑA",
        type: "error",
      })
    );
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
  try {
    yield put(ui.showLoader(true));
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
