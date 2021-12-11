import ordersTypes from "./orders.types";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  handleSaveOrder,
  handleGetUserOrderHistory,
  handleGetOrder,
} from "./orders.helpers";
import { auth } from "./../../firebase/utils";
import { clearCart } from "./../Cart/cart.actions";
import { setUserOrderHistory, setOrderDetails } from "./orders.actions";
import { ui } from "../../redux/UI/ui.actions";

export function* getUserOrderHistory({ payload }) {
  try {
    yield put(ui.showLoader(true));
    const history = yield handleGetUserOrderHistory(payload);
    yield put(setUserOrderHistory(history));
  } catch (err) {
    console.log(err);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(
    ordersTypes.GET_USER_ORDER_HISTORY_START,
    getUserOrderHistory
  );
}

export function* saveOrder({ payload }) {
  try {
    yield put(ui.showLoader(true));
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    });
    yield put(clearCart());
    yield put(ui.showMessage({ msg: "COMPRA REALIZADA", type: "success" }));
  } catch (err) {
    // console.log(err);
    yield put(
      ui.showMessage({ msg: "NO SE PUDO REALIZAR LA COMPRA", type: "error" })
    );
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
}

export function* getOrderDetails({ payload }) {
  try {
    yield put(ui.showLoader(true));
    const order = yield handleGetOrder(payload);
    console.log(order);
    yield put(setOrderDetails(order));
  } catch (err) {
    // console.log(err);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
}

export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ]);
}
