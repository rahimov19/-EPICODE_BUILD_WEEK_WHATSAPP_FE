import * as Icon from "react-bootstrap-icons";
import { Form } from "react-bootstrap";

const WriteNewMessage = () => {
  return (
    <div className="write-new-message-container bg-hover flex-utility justify-content-between align-items-center">
      <div className="mr-3">
        <Icon.EmojiSmile className="iconTop" />
      </div>
      <div className="mr-3">
        <Icon.Paperclip className="iconTop" />
      </div>
      <div className="flex-grow-1 h-75 mr-3">
        <Form.Control
          as="textarea"
          placeholder="Type a message"
          className="h-100"
        />
      </div>
      <div>
        <Icon.MicFill className="iconTop" />
      </div>
    </div>
  );
};

export default WriteNewMessage;
