import { Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import * as Icon from "react-bootstrap-icons";
import { format, parseISO } from "date-fns";

const MainChat = () => {
  const selectedChatHistory = useSelector(
    (state) => state.chats.selectedChat.history
  );

  const myProfile = useSelector((state) => state.chats.user);

  console.log("history chat ________", selectedChatHistory);

  return (
    <div className="chat-scroll">
      {selectedChatHistory.map((msg) => {
        if (msg.sender.toString() === myProfile._id.toString()) {
          return (
            <div className="incomingMessage">
              <Row>
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
                  <div className="d-flex flex-column bg-secondary2 mt-2 ml-2 px-3 py-2 messageBox">
                    <div className="messageName">{myProfile.username}</div>
                    <div>{msg.text}</div>
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
            <div className="outcommingMessage">
              <Row className="outMesssageRow">
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
                  <div className="d-flex flex-column bg-green mt-2 ml-2 px-3 py-2 messageBox">
                    <div className="messageName">{msg.sender.username}</div>
                    <div>{msg.text}</div>
                  </div>
                  <div className="messageTime">
                    {format(parseISO(msg.createdAt), "HH:mm")}
                  </div>
                </div>
              </Row>
            </div>
          );
        }
      })}
    </div>
  );
};

export default MainChat;
