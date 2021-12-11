import { auth } from "./../../firebase/utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  setProducts,
  fetchProductsStart,
  setProduct,
} from "./products.actions";
import {
  handleAddProduct,
  handleEditProduct,
  handleFetchProducts,
  handleDeleteProduct,
  handleFetchProduct,
} from "./products.helpers";
import productsTypes from "./products.types";
import { ui } from "../../redux/UI/ui.actions";

export function* addProduct({
  payload: {
    productCategory,
    productISBN,
    productName,
    productAuthor,
    productThumbnail,
    productDescription,
    productPrice,
    productStock,
  },
}) {
  try {
    yield put(ui.showLoader(true));
    const timestamp = new Date();
    yield handleAddProduct({
      productCategory,
      productISBN,
      productName,
      productAuthor,
      productThumbnail,
      productDescription,
      productPrice,
      productStock,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* editProduct({
  payload: {
    productId,
    productCategory,
    productISBN,
    productName,
    productAuthor,
    productThumbnail,
    productDescription,
    productPrice,
    productStock,
  },
}) {
  try {
    yield put(ui.showLoader(true));
    const timestamp = new Date();
    yield handleEditProduct({
      productId,
      productCategory,
      productISBN,
      productName,
      productAuthor,
      productThumbnail,
      productDescription,
      productPrice,
      productStock,
      productAdminUserUID: auth.currentUser.uid,
      createdDate: timestamp,
    });
    yield put(fetchProductsStart());
  } catch (err) {
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onAddProductStart() {
  yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* onEditProductStart() {
  yield takeLatest(productsTypes.EDIT_PRODUCT_START, editProduct);
}

export function* fetchProducts({ payload }) {
  try {
    yield put(ui.showLoader(true));
    const products = yield handleFetchProducts(payload);
    yield put(setProducts(products));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onFetchProductsStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* deleteProduct({ payload }) {
  try {
    yield put(ui.showLoader(true));
    yield handleDeleteProduct(payload);
    yield put(fetchProductsStart());
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onDeleteProductStart() {
  yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    yield put(ui.showLoader(true));
    const product = yield handleFetchProduct(payload);
    yield put(setProduct(product));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(ui.showLoader(false));
  }
}

export function* onFetchProductStart() {
  yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export default function* productsSagas() {
  yield all([
    call(onAddProductStart),
    call(onFetchProductsStart),
    call(onDeleteProductStart),
    call(onFetchProductStart),
    call(onEditProductStart),
  ]);
}
