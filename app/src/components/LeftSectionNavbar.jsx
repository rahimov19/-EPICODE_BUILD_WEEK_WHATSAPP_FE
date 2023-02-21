import * as Icon from "react-bootstrap-icons";
import UserInfo from "./UserInfo";

const LeftSectionNavbar = () => {
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      <div className="navbar-user-icon flex-utility align-items-center justify-content-center">
        <UserInfo />
      </div>
      <div className="flex-utility">
        <div className="mr-3">
          <Icon.PeopleFill className="iconTop" />
        </div>
        <div className="mr-3">
          <Icon.ArrowRepeat className="iconTop" />
        </div>
        <div className="mr-3">
          <Icon.ChatLeftTextFill className="iconTop" />
        </div>
        <div>
          <Icon.ThreeDotsVertical className="iconTop" />
        </div>
      </div>
    </div>
  );
};

export default LeftSectionNavbar;
