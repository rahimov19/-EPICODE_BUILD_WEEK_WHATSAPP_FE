import { FETCH_CHATS, SAVE_TOKEN, SAVE_USER } from "../actions";

const initialState = {
  chatsStore: [],
  user: {},
  accessToken: {},
};

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return { ...state, chatsStore: [state.chatsStore, action.payload] };
    case SAVE_USER:
      return { ...state, user: action.payload };
    case SAVE_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

export default chatsReducer;
