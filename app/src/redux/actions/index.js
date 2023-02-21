export const SAVE_USER = "SAVE_USER";
export const FETCH_CHATS = "FETCH_CHATS";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const GET_CHATS_LOADING = "GET_CHATS_LOADING";
export const GET_CHATS_ERROR = "GET_CHATS_ERROR";

export const saveUserAction = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const fetchChatsAction = () => {
  return async (dispatch, getState) => {
    console.log("getSTate", getState());
    //take the accessToken from the getState after we have the user set in place
    try {
      const accessToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzNjExZjJkNGFjMjlkZWNiNzhlNWMiLCJpYXQiOjE2NzY5NzMwODgsImV4cCI6MTY3NzU3Nzg4OH0.TEfdfhhYn4GDBA99-1I0cGasGA5-6tZmk0eHkia7bhE";
      console.log(accessToken);
      const getChatsOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      // console.log("url", `${process.env.REACT_APP_BE_URL}/chats`);
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats`,
        getChatsOptions
      );
      if (response.ok) {
        const fetchedData = await response.json();
        dispatch({ type: FETCH_CHATS, payload: fetchedData });
        dispatch({ type: GET_CHATS_LOADING, payload: false });
        dispatch({ type: GET_CHATS_ERROR, payload: false });
      } else {
        dispatch({
          type: GET_CHATS_LOADING,
          payload: false,
        });

        // this action will just turn true the isError variable in the book slice
        dispatch({
          type: GET_CHATS_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_CHATS_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_CHATS_ERROR,
        payload: true,
      });
    }
  };
};
