export const SAVE_USER = "SAVE_USER";
export const FETCH_CHATS = "FETCH_CHATS";
export const FETCH_MESSAGES = "FETCH_MESSAGES";

export const saveUserAction = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const fetchChatsAction = (chats) => {
  return async (dispatch, getState) => {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/chats`);
    const fetchedData = await response.json();
    dispatch({ type: FETCH_CHATS, payload: fetchedData });
  };
};
