import {
  FETCH_CHATS,
  SAVE_USER,
  GET_CHATS_LOADING,
  GET_CHATS_ERROR,
  SAVE_TOKEN,
  CHECK_AUTHENTICATION,
  SET_SEARCHED_CHAT,
} from "../actions";

const initialState = {
  chatsStore: [],
  user: {},
  isChatListLoading: true,
  isChatListError: false,
  accessToken: {},
  isAuthenticated: false,
  currentSearchedChat: "",
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
    case CHECK_AUTHENTICATION:
      return { ...state, isAuthenticated: action.payload };
    case SET_SEARCHED_CHAT:
      return {
        ...state,
        currentSearchedChat: action.payload,
      };
    default:
      return state;
  }
};

export default chatsReducer;
