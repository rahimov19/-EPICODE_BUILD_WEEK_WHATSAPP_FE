import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchChatInput from "./SearchChatInput";
import SingleUserChatBox from "./SingleUserChatBox";

const ChatList = () => {
  const chatList = useSelector((state) => state.chats.chatsStore);
  console.log("~~~~~~~~~~~~", chatList);
  // const  chatList, se chatList] = useState(chatList);

  // useEffect(() => {
  //   se chatList(chatList);
  // }, [chatList]);
  // console.log("----------------", chatList);
  return (
    <div>
      <SearchChatInput />
      {chatList.length !== 0 &&
        chatList.map((chat) => {
          console.log("how many chats do we have?: ", chatList.length);
          console.log("current chat: ", chat);
          return <SingleUserChatBox key={chat._id} chatDetails={chat} />;
        })}
      {/* <SingleUserChatBox /> */}
    </div>
  );
};

export default ChatList;
