import { OverlayTrigger } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { CLEAR_FULL_STORE } from "../redux/actions";
import GroupChatModal from "./GroupChatModal";
import NewChatModal from "./NewChatModal";
import UserInfo from "./UserInfo";

const LeftSectionNavbar = () => {
  const dispatch = useDispatch();
  const clearStore = () => {
    dispatch({ type: CLEAR_FULL_STORE });
  };
  const popover = (
    <div className="popoverNavbar">
      <div className="popoverDiv">
        <p>New Group</p>
      </div>
      <div className="popoverDiv">
        <p>New Community</p>
      </div>
      <div className="popoverDiv">
        <p>Star Marked Messages</p>
      </div>
      <div className="popoverDiv">
        <p>Settings</p>
      </div>
      <div className="popoverDiv" onClick={clearStore}>
        <p>Log Out</p>
      </div>
    </div>
  );
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      <div className="navbar-user-icon flex-utility align-items-center justify-content-center">
        <UserInfo />
      </div>
      <div className="flex-utility">
        <div className="mr-3">
          <GroupChatModal />
        </div>
        <div className="mr-3">
          <Icon.ArrowRepeat className="iconTop" />
        </div>
        <div className="mr-3">
          <NewChatModal />
        </div>
        <div>
          {
            <OverlayTrigger
              trigger="click"
              placement="bottom-end"
              overlay={popover}
              rootClose={true}
            >
              <Icon.ThreeDotsVertical className="iconTop" />
            </OverlayTrigger>
          }
        </div>
      </div>
    </div>
  );
};

export default LeftSectionNavbar;
