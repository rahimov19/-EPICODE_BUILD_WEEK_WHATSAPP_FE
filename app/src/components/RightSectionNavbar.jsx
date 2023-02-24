import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const RightSectionNavbar = () => {
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      <div className="flex-utility">
        <div className="navbar-user-icon flex-utility align-items-center justify-content-center mr-3">
          {selectedChat &&
          selectedChat.type === "private" &&
          selectedChat.members ? (
            selectedChat.members[0].avatar ? (
              <img
                src={selectedChat.members[0].avatar}
                alt="avatar image"
                className="userImageChat"
              />
            ) : (
              <Icon.PersonFill className="defaultUserAvatar" />
            )
          ) : selectedChat &&
            selectedChat.type === "group" &&
            selectedChat.members ? (
            <Icon.PeopleFill className="defaultGroupAvatar" />
          ) : (
            <></>
          )}
        </div>
      </div>
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
