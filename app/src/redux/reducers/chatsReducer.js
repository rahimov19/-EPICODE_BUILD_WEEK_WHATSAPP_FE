import {
  FETCH_CHATS,
  SAVE_USER,
  GET_CHATS_LOADING,
  GET_CHATS_ERROR,
  SAVE_TOKEN,
} from "../actions";

const initialState = {
  chatsStore: [],
  user: {},
  isChatListLoading: true,
  isChatListError: false,
  accessToken: {},
};

const chatsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHATS:
      return { ...state, chatsStore: action.payload };
    case SAVE_USER:
      return { ...state, user: action.payload };
    case GET_CHATS_LOADING:
      return {
        ...state,
        isChatListLoading: action.payload,
      };
    case GET_CHATS_ERROR:
      return {
        ...state,
        isChatListError: action.payload,
      };
    case SAVE_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

export default chatsReducer;
