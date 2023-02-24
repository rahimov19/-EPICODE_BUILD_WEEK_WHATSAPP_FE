import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChatAction } from "../redux/actions";

const SingleUserChatBox = ({ chatDetails }) => {
  const chatMembers = chatDetails.members;
  const chatHistory = chatDetails.history;
  const chats = useSelector((state) => state.chats.chatStore);
  const [filteredChat, setFilteredChat] = useState([]);
  const user = useSelector((state) => state.chats.user);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  let messageDate = "";
  let lastMessageDate = "";
  if (chatHistory.length !== 0) {
    lastMessageDate = chatHistory[chatHistory.length - 1].createdAt;
    messageDate = format(parseISO(lastMessageDate), "MM/dd/yyyy");
  }

  const filterMember = () => {
    if (chatDetails.type === "private") {
      const filteredMemebr = chatDetails.members.filter(
        (member) => member._id !== user._id
      );
      setFilteredChat(filteredMemebr);
      console.log(filteredMemebr);
    }
  };
  useEffect(() => {
    filterMember();
  }, [chats]);

  const dispatch = useDispatch();

  const displaySelectedChat = (chatInfo) => {
    dispatch(setSelectedChatAction(chatInfo));
  };
  return (
    <div
      onClick={() => displaySelectedChat(chatDetails)}
      className={
        selectedChat._id.toString() === chatDetails._id.toString()
          ? "flex-utility justify-content-between align-items-center chat-box-design currentSelectedChat"
          : "flex-utility justify-content-between align-items-center chat-box-design"
      }
    >
      <div className="flex-grow-1 flex-utility align-items-center">
        <div className="chat-user-icon flex-utility align-items-center justify-content-center mr-3">
          {filteredChat[0] &&
          chatDetails.type === "private" &&
          filteredChat[0].avatar ? (
            <img
              src={filteredChat[0].avatar}
              alt="avatar"
              className="userImageChat"
            />
          ) : filteredChat[0] &&
            chatDetails.type === "private" &&
            !filteredChat[0].avatar ? (
            <Icon.PersonFill className="defaultUserAvatar" />
          ) : (
            <Icon.PeopleFill className="defaultGroupAvatar" />
          )}
        </div>
        {filteredChat && chatDetails.type === "private" ? (
          <div className="flex-grow-1">
            <div>{filteredChat[0] ? filteredChat[0].username : <></>}</div>
            {chatHistory.length !== 0 ? (
              <div className="d-md-none d-lg-block">
                {chatHistory[chatHistory.length - 1].text}
              </div>
            ) : (
              <div className="no-messages-yet">Start new chat</div>
            )}
          </div>
        ) : (
          <div className="flex-grow-1">
            <div>{chatDetails.groupName}</div>
            {chatHistory.length !== 0 ? (
              <div>{chatHistory[chatHistory.length - 1].text}</div>
            ) : (
              <div className="no-messages-yet">Start new chat</div>
            )}
          </div>
        )}
      </div>
      <div className="flex-utility align-items-center justify-content-center date-chat-design">
        {chatDetails && messageDate !== "" ? messageDate : ""}
      </div>
    </div>
  );
};

export default SingleUserChatBox;
