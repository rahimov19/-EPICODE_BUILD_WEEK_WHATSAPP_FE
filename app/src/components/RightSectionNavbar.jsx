import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { useSelector } from "react-redux";

const RightSectionNavbar = () => {
  const user = useSelector((state) => state.chats.user);
  const selectedChat = useSelector((state) => state.chats.selectedChat);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    filterFunc();
  }, [selectedChat]);
  const filterFunc = () => {
    if (
      selectedChat &&
      selectedChat.type === "private" &&
      selectedChat.members
    ) {
      const filteredChat = selectedChat.members.filter(
        (member) => member._id !== user._id
      );
      setArr(filteredChat);
    }
  };
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      {selectedChat && selectedChat.type === "private" && arr ? (
        <div className="flex-utility">
          <div className="navbar-user-icon flex-utility align-items-center justify-content-center mr-3">
            {arr[0] && arr[0].avatar ? (
              <img

                src={arr[0].avatar}
                alt="avatar image"

                className="userImageChat"
              />
            ) : (
              <Icon.PersonFill className="defaultUserAvatar" />
            )}
          </div>
          <div className="my-auto">{arr[0] ? arr[0].username : <></>}</div>
        </div>
      ) : (
        <div className="flex-utility">
          <div className="navbar-user-icon flex-utility align-items-center justify-content-center mr-3">
            <Icon.PeopleFill className="defaultGroupAvatar" />
          </div>
          <div className="my-auto">
            {selectedChat ? selectedChat.groupName : <></>}
          </div>
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
