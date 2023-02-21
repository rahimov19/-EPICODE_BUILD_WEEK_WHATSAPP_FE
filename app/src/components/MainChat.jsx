import { Row } from "react-bootstrap";

const MainChat = () => {
  return (
    <div className="chat-scroll">
      <div className="incomingMessage">
        <Row>
          <div className="d-flex flex-row-reverse pl-4 mt-2">
            <img
              src="http://placekitten.com/50"
              alt="avarat"
              className="messageAvatar"
            />
          </div>
          <div className="d-flex align-items-end">
            <div className="d-flex flex-column bg-secondary2 mt-2 ml-2 px-3 py-2 messageBox">
              <div className="messageName">Name Surname</div>
              <div>Message: Gello World</div>
            </div>
            <div className="messageTime">12:32</div>
          </div>
        </Row>
      </div>
      <div className="outcommingMessage">
        {" "}
        <Row className="outMesssageRow">
          <div className="d-flex flex-row-reverse pl-4 mt-2">
            <img
              src="http://placekitten.com/50"
              alt="avarat"
              className="messageAvatar"
            />
          </div>
          <div className="d-flex align-items-end">
            <div className="d-flex flex-column bg-green mt-2 ml-2 px-3 py-2 messageBox">
              <div className="messageName">Sur Namename</div>
              <div>
                Some really long message in order to see how it will effect
                placement on main chat and see if its really cool as its needs
                to be or not. Some more bla bla bla to fill some space. I could
                just use lorem but im too lazy for it.
              </div>
            </div>
            <div className="messageTime">12:32</div>
          </div>
        </Row>
      </div>
    </div>
  );
};

export default MainChat;
