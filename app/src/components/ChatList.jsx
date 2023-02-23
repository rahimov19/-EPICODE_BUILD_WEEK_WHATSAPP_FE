/* eslint-disable array-callback-return */

import { useSelector } from "react-redux";
import SearchChatInput from "./SearchChatInput";
import SingleUserChatBox from "./SingleUserChatBox";

const ChatList = () => {
  const chatList = useSelector((state) => state.chats.chatsStore);
  // const currentSearchedChat = useSelector(
  //   (state) => state.chats.currentSearchedChat
  // );
  const currentSearchedChat = "Akb";

  const matchingChats = chatList.filter((chat) => {
    console.log(chatList);

    chat.members[0].username
      .toLowerCase()
      .includes(currentSearchedChat.toLowerCase());

    return chat;
  });

  console.log("My chat list usernames : ", matchingChats);
  return (
    <div>
      <SearchChatInput />
      {chatList.length !== 0 &&
        matchingChats.map((chat) => {
          if (chat.history.length !== 0) {
            return <SingleUserChatBox key={chat._id} chatDetails={chat} />;
          }
        })}
    </div>
  );
};

export default ChatList;
