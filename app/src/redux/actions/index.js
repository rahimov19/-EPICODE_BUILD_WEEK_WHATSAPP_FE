export const SAVE_USER = "SAVE_USER";
export const SAVE_TOKEN = "SAVE_TOKEN";
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

export const getMyUserDetailsAction = (accessToken) => {
  return async (dispatch) => {
    const optionsGet = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
      } else {
        console.log("Error fetching own user data");
      }
    } catch (error) {
      console.log("error: ", error);
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
      }
    } catch (error) {
      console.log("error: ", error);
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
