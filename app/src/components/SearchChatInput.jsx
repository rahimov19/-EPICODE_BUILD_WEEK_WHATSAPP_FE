import { InputGroup, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

const SearchChatInput = () => {
  return (
    // <div className="flex-utility align-items-center bg-secondary">
    <div className="flex-utility justify-content-between align-items-center">
      <div className="py-2 flex-grow-1  mr-2">
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <Icon.Search />
          </InputGroup.Text>
          <Form.Control
            className="input-search-bg"
            placeholder="Search or start a conversation"
          />
        </InputGroup>
      </div>
      <div className="">
        <Icon.Filter className="iconTop" />
      </div>
    </div>
  );
};

export default SearchChatInput;
