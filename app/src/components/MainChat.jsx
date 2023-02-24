/* eslint-disable react-hooks/exhaustive-deps */
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { format, parseISO } from "date-fns";

import { useContext, useEffect, useRef } from "react";
import {
  fetchChatsAction,
  getChat,
  setSelectedChatAction,
} from "../redux/actions";

import { SocketContent } from "../context/socket";

const MainChat = () => {
  const socket = useContext(SocketContent);

  const selectedChatHistory = useSelector((state) => state.chats.selectedChat);

  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const chats = useSelector((state) => state.chats.chatsStore);

  const myProfile = useSelector((state) => state.chats.user);
  const accessToken = useSelector((state) => state.chats.accessToken);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on("newMessage", (message) => {
      console.log("MESSAGE IS:", message);
      dispatch(getChat(accessToken, message.chatid));
    });
    return () => {
      socket.removeAllListeners("newMessage");
    };
  }, []);
  useEffect(() => {
    chats.map((chat) => socket.emit("join-room", chat.room));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chats]);

  return (
    <div className="chat-scroll">
      {selectedChat && selectedChat.history ? (
        selectedChat.history.map((msg, index) => {
          if (msg.sender._id.toString() !== myProfile._id.toString()) {
            return (
              <div className="incomingMessage" key={index}>
                <Row>
                  <div className="d-flex flex-row-reverse pl-4 mt-2">
                    {msg.sender.avatar ? (
                      <img
                        src={msg.sender.avatar}
                        alt="avarat"
                        className="messageAvatar"
                      />
                    ) : (
                      <Icon.PersonFill />
                    )}
                  </div>
                  <div className="d-flex align-items-end">
                    <div className="d-flex flex-column bg-secondary2 mt-2 ml-2 px-3 py-2 messageBox2">
                      <div className="messageName">{msg.sender.username}</div>
                      {msg.image ? (
                        <img
                          src={msg.image}
                          alt="message"
                          className="messageImg"
                        />
                      ) : (
                        <div>{msg.text}</div>
                      )}
                    </div>
                    <div className="messageTime">
                      {format(parseISO(msg.createdAt), "HH:mm")}
                    </div>
                  </div>
                </Row>
              </div>
            );
          } else {
            return (
              <div className="outcommingMessage" key={index}>
                <Row className="outMesssageRow">
                  <div className="d-flex flex-row-reverse pl-4 mt-2">
                    {myProfile.avatar ? (
                      <img
                        src={myProfile.avatar}
                        alt="avarat"
                        className="messageAvatar"
                      />
                    ) : (
                      <Icon.PersonFill />
                    )}
                  </div>
                  <div className="d-flex align-items-end">
                    <div className="d-flex flex-column bg-green mt-2 ml-2 px-3 py-2 messageBox">
                      <div className="messageName">{myProfile.username}</div>
                      {msg.image ? (
                        <img
                          src={msg.image}
                          alt="message"
                          className="messageImg"
                        />
                      ) : (
                        <div>{msg.text}</div>
                      )}
                    </div>
                    <div className="messageTime">
                      {format(parseISO(msg.createdAt), "HH:mm")}
                    </div>
                  </div>
                </Row>
              </div>
            );
          }
        })
      ) : (
        <></>
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default MainChat;
