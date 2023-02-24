/* eslint-disable react-hooks/exhaustive-deps */
import * as Icon from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatsAction, setSelectedChatAction } from "../redux/actions";
import { SocketContent } from "../context/socket";
const WriteNewMessage = () => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContent);
  const user = useSelector((state) => state.chats.user);
  const currentChat = useSelector((state) => state.chats.selectedChat);
  const accessToken = useSelector((state) => state.chats.accessToken);
  const selectedChatHistory = useSelector((state) => state.chats.selectedChat);
  const chats = useSelector((state) => state.chats.chatsStore);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  useEffect(() => {
    const refreshedChat = chats.find(
      (chat) => chat._id === selectedChatHistory._id
    );
    dispatch(setSelectedChatAction(refreshedChat));
  }, [chats, message]);
  useEffect(() => {
    sendImage();
  }, [image]);

  const sendImage = async () => {
    if (image !== null) {
      const formData = new FormData();

      formData.append("message", image);

      const options2 = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      try {
        const newMessage = {
          sender: user._id,
          text: "image",
          chatid: selectedChatHistory._id,
        };
        const options = {
          method: "POST",
          body: JSON.stringify(newMessage),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
        let idResponse = await fetch(
          `${process.env.REACT_APP_BE_URL}/chats/${currentChat._id}/messages`,
          options
        );

        if (idResponse.ok) {
          try {
            const idToSend = await idResponse.json();
            const endpoint = `${process.env.REACT_APP_BE_URL}/chats/${currentChat._id}/${idToSend._id}/image`;
            const response = await fetch(endpoint, options2);
          } catch (error) {
            console.log(error);
          }
        }
        const room = currentChat.room;
        socket.emit("sendMessage", newMessage, room);
        dispatch(fetchChatsAction(accessToken));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("error while sending an image - its null");
    }
  };

  const sendMessage = async () => {
    const newMessage = {
      sender: user._id,
      text: message,
      chatid: selectedChatHistory._id,
    };
    const room = currentChat.room;
    socket.emit("sendMessage", newMessage, room);
    console.log(currentChat.room, "ROOOOOOOOOOOOOOM");
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };
      let response = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats/${currentChat._id}/messages`,
        options
      );
      if (response.ok) {
        dispatch(fetchChatsAction(accessToken));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write-new-message-container bg-hover flex-utility justify-content-between align-items-center">
      <div className="mr-3">
        <Icon.EmojiSmile className="iconTop" />
      </div>
      <div className="mr-3">
        <input
          id="imageUpload"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <label for="imageUpload">
          {" "}
          <Icon.Paperclip className="iconTop" />
        </label>
      </div>
      <div className="flex-grow-1 mr-3">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
            sendMessage();
            e.target.reset();
            setMessage(e.target.value);
          }}
        >
          <Form.Control
            type="text"
            placeholder="Type a message"
            className="h-100"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </Form>
      </div>
      <div>
        <Icon.MicFill className="iconTop" />
      </div>
    </div>
  );
};

export default WriteNewMessage;
