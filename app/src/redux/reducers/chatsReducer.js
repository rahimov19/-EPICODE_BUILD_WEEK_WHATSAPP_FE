import { FETCH_CHATS, SAVE_USER } from "../actions";

const initialState = {
  chatsStore: [],
  user: {},
};

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return { ...state, chatsStore: [state.chatsStore, action.payload] };
    case SAVE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default chatsReducer;
