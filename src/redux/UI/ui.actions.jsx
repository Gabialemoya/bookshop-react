export const SHOW_LOADER = "SHOW_LOADER";
export const SHOW_MESSAGE = "SHOW_MESSAGE";

function showLoader(payload) {
  return { type: SHOW_LOADER, payload };
}

function showMessage(payload) {
  return { type: SHOW_MESSAGE, payload };
}

export const ui = { showLoader, showMessage };
