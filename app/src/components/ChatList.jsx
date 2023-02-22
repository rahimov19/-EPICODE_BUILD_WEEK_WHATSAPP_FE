import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchChatInput from "./SearchChatInput";
import SingleUserChatBox from "./SingleUserChatBox";

const ChatList = () => {
  const chatList = useSelector((state) => state.chats.chatsStore);
  const currentSearchedChat = useSelector(
    (state) => state.chats.currentSearchedChat
  );

  const matchingChats = chatList.filter((chat) => {
    if (
      chat.members[0].username
        .toLowerCase()
        .includes(currentSearchedChat.toLowerCase())
    ) {
      return chat;
    }
  });

  console.log("My chat list usernames : ", matchingChats);
  return (
    <div>
      <SearchChatInput />
      {chatList.length !== 0 &&
        matchingChats.map((chat) => {
          // if (chat.history.length !== 0) {}
          // console.log("how many chats do we have?: ", chatList.length);
          // console.log("current chat: ", chat);
          return <SingleUserChatBox key={chat._id} chatDetails={chat} />;
        })}
    </div>
  );
};

export default ChatList;
