import { format, parseISO } from "date-fns";
import * as Icon from "react-bootstrap-icons";

const SingleUserChatBox = ({ chatDetails }) => {
  console.log("^^^^^^^^^^^^^^", chatDetails);
  const chatMembers = chatDetails.members;
  const chatHistory = chatDetails.history;
  let messageDate = "";
  let lastMessageDate = "";
  if (chatHistory.length !== 0) {
    lastMessageDate = chatHistory[chatHistory.length - 1].createdAt;
    messageDate = format(parseISO(lastMessageDate), "MM/dd/yyyy");
  }
  console.log("history", chatHistory);
  console.log("members: ", chatMembers);
  return (
    <div className="flex-utility justify-content-between align-items-center chat-box-design">
      <div className="flex-grow-1 flex-utility align-items-center">
        <div className="chat-user-icon flex-utility align-items-center justify-content-center mr-3">
          {chatDetails &&
          chatDetails.type === "private" &&
          chatMembers[0].avatar ? (
            <img
              src={chatMembers[0].avatar}
              alt="avatar image"
              className="userImageChat"
            />
          ) : chatDetails &&
            chatDetails.type === "private" &&
            !chatMembers[0].avatar ? (
            <Icon.PersonFill className="defaultUserAvatar" />
          ) : (
            <Icon.PeopleFill className="defaultGroupAvatar" />
          )}
        </div>
        {chatDetails && chatDetails.type === "private" ? (
          <div className="flex-grow-1">
            <div>{chatMembers[0].username}</div>
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
            <div>Group name</div>
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
