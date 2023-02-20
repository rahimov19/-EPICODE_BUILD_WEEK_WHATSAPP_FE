import * as Icon from "react-bootstrap-icons";

const LeftSectionNavbar = () => {
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      <div className="navbar-user-icon flex-utility align-items-center justify-content-center">
        icon
      </div>
      <div className="flex-utility">
        <div className="mr-3">
          <Icon.PeopleFill />
        </div>
        <div className="mr-3">
          <Icon.ArrowRepeat />
        </div>
        <div className="mr-3">
          <Icon.ChatLeftTextFill />
        </div>
        <div>
          <Icon.ThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default LeftSectionNavbar;
