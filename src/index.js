import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/createStore";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    {" "}
    {/* store disponible en toda la app */}
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <ToastProvider>
          <App />
        </ToastProvider>
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
