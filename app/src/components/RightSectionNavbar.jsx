import * as Icon from "react-bootstrap-icons";

const RightSectionNavbar = () => {
  return (
    <div className="flex-utility justify-content-between align-items-center h-100">
      <div className="flex-utility">
        <div className="navbar-user-icon flex-utility align-items-center justify-content-center mr-3">
          icon
        </div>
        <div className="flex-utility align-items-center justify-content-center">
          name
        </div>
      </div>
      <div className="flex-utility">
        <div className="mr-3">
          <Icon.Search />
        </div>
        <div>
          <Icon.ThreeDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default RightSectionNavbar;
