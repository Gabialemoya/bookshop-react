import { SHOW_LOADER, SHOW_MESSAGE } from "./ui.actions";

console.log("User Interface Reducer....");

const initialState = {
  loading: false,
  msgInfo: undefined,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        msgInfo: { msg: action.payload.msg, type: action.payload.type },
      };
    case SHOW_LOADER:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}
