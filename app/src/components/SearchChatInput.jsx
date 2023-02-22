import { useState } from "react";
import { InputGroup, Form } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedChatAction } from "../redux/actions";

const SearchChatInput = () => {
  const [searchedChat, setSearchedChat] = useState(null);
  const chatList = useSelector((state) => state.chats.chatsStore);
  const dispatch = useDispatch();

  const onChangeHandler = (event) => {
    setSearchedChat(event.target.value);
    dispatch(setSearchedChatAction(event.target.value));
  };

  return (
    <div className="flex-utility justify-content-between align-items-center">
      <div className="py-2 flex-grow-1  mr-2">
        {/* <Form> */}
        <InputGroup>
          <InputGroup.Text id="basic-addon1">
            <Icon.Search />
          </InputGroup.Text>
          <Form.Control
            className="input-search-bg"
            placeholder="Search or start a conversation"
            onChange={onChangeHandler}
          />
        </InputGroup>
        {/* </Form> */}
      </div>
      <div className="">
        <Icon.Filter className="iconTop" />
      </div>
    </div>
  );
};

export default SearchChatInput;
