import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const RightSectionNavbar = () => {
  const [filteredChat, setFilteredChat] = useState([]);
  const user = useSelector((state) => state.chats.user);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  useEffect(() => {
    filterMember();
  }, [selectedChat]);
  const filterMember = () => {
    if (
      selectedChat &&
      selectedChat.type === "private" &&
      selectedChat.members
    ) {
      const filteredMemebr = selectedChat.members.filter(
        (member) => member._id !== user._id
      );
      setFilteredChat(filteredMemebr);
    }
  };
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      {filteredChat &&
      filteredChat.type === "private" &&
      filteredChat.members ? (
        <div className="flex-utility">
          <div className="navbar-user-icon flex-utility align-items-center justify-content-center mr-3">
            {filteredChat[0].avatar ? (
              <img
                src={filteredChat[0].avatar}
                alt="avatar image"
                className="userImageChat"
              />
            ) : (
              <Icon.PersonFill className="defaultUserAvatar" />
            )}
          </div>
          <div className="my-auto">{filteredChat[0].username}</div>
        </div>
      ) : (
        <div className="flex-utility">
          <div className="navbar-user-icon flex-utility align-items-center justify-content-center mr-3">
            <Icon.PeopleFill className="defaultGroupAvatar" />
          </div>
          <div className="my-auto">{selectedChat.groupName}</div>
        </div>
      )}
      <div className="flex-utility">
        <div className="mr-3">
          <Icon.Search className="iconTop" />
        </div>
        <div>
          <Icon.ThreeDotsVertical className="iconTop" />
        </div>
      </div>
    </div>
  );
};

export default RightSectionNavbar;
