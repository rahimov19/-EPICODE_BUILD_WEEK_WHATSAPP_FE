export const SAVE_USER = "SAVE_USER";
export const SAVE_TOKEN = "SAVE_TOKEN";
export const FETCH_CHATS = "FETCH_CHATS";
export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const GET_CHATS_LOADING = "GET_CHATS_LOADING";
export const GET_CHATS_ERROR = "GET_CHATS_ERROR";
export const CHECK_AUTHENTICATION = "CHECK_AUTHENTICATION";
export const SET_SEARCHED_CHAT = "SET_SEARCHED_CHAT";
export const CREATE_NEW_CHAT = "CREATE_NEW_CHAT";
export const SET_SELECTED_CHAT = "SET_SELECTED_CHAT";


export const saveUserAction = (user) => {
  return {
    type: SAVE_USER,
    payload: user,
  };
};

export const fetchChatsAction = (accessToken) => {
  return async (dispatch, getState) => {
    console.log("getSTate", getState());
    //take the accessToken from the getState after we have the user set in place
    try {
      // const accessToken = getState()
      //   .chats.accessToken
      // const accessToken =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzNjExZjJkNGFjMjlkZWNiNzhlNWMiLCJpYXQiOjE2NzY5NzMwODgsImV4cCI6MTY3NzU3Nzg4OH0.TEfdfhhYn4GDBA99-1I0cGasGA5-6tZmk0eHkia7bhE";
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
        console.log("FETCHED DATA", fetchedData);
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

export const getMyUserDetailsAction = (accessToken) => {
  return async (dispatch) => {
    const optionsGet = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YzNjExZjJkNGFjMjlkZWNiNzhlNWMiLCJpYXQiOjE2NzY5NzMwODgsImV4cCI6MTY3NzU3Nzg4OH0.TEfdfhhYn4GDBA99-1I0cGasGA5-6tZmk0eHkia7bhV`,
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await fetch(`http://localhost:3001/users/me`, optionsGet);
      if (response.ok) {
        let data = await response.json();
        console.log("🚀 ~ file: index.js:34 ~ return ~ data:", data);
        dispatch({
          type: SAVE_USER,
          payload: data,
        });
        dispatch({
          type: CHECK_AUTHENTICATION,
          payload: true,
        });
      } else {
        console.log("Error fetching own user data");
        dispatch({
          type: CHECK_AUTHENTICATION,
          payload: false,
        });
        dispatch({
          type: SAVE_TOKEN,
          payload: "",
        });
        dispatch({
          type: SAVE_USER,
          payload: {},
        });
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch({
        type: CHECK_AUTHENTICATION,
        payload: false,
      });
      dispatch({
        type: SAVE_TOKEN,
        payload: "",
      });
      dispatch({
        type: SAVE_USER,
        payload: {},
      });
    }
  };
};

export const submitLoginAction = (details) => {
  return async (dispatch) => {
    const optionsPost = {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await fetch(
        `http://localhost:3001/users/login`,
        optionsPost
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: SAVE_TOKEN,
          payload: data.accessToken,
        });
        dispatch(getMyUserDetailsAction(data.accessToken));
      } else {
        console.log("Error loggin in");
        dispatch({
          type: CHECK_AUTHENTICATION,
          payload: false,
        });
        dispatch({
          type: SAVE_TOKEN,
          payload: "",
        });
        dispatch({
          type: SAVE_USER,
          payload: {},
        });
      }
    } catch (error) {
      console.log("error: ", error);
      dispatch({
        type: CHECK_AUTHENTICATION,
        payload: false,
      });
      dispatch({
        type: SAVE_TOKEN,
        payload: "",
      });
      dispatch({
        type: SAVE_USER,
        payload: {},
      });
    }
  };
};

export const submitRegisterAction = (details) => {
  return async (dispatch) => {
    const optionsPost = {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await fetch(
        `http://localhost:3001/users/register`,
        optionsPost
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: SAVE_TOKEN,
          payload: data.accessToken,
        });
        dispatch(getMyUserDetailsAction(data.accessToken));
      } else {
        console.log("Error changing profile details");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const createNewChatAction = (details, accessToken, handleClose) => {
  return async (dispatch) => {
    console.log(details);
    const optionsPost = {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };
    try {
      let response = await fetch(`http://localhost:3001/chats`, optionsPost);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.log("Chat already exists");
        return handleClose();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
};

export const setSearchedChatAction = (chatName) => {
  return {
    type: SET_SEARCHED_CHAT,
    payload: chatName,
  };
};

export const setSelectedChatAction = (chatInfo) => {
  return {
    type: SET_SELECTED_CHAT,
    payload: chatInfo,
  };
};
