import LeftMainPage from "./LeftMainPage";
import RightMainPage from "./RightMainPage";
import { Container, Col, Row } from "react-bootstrap";
import LeftSectionNavbar from "./LeftSectionNavbar";
import RightSectionNavbar from "./RightSectionNavbar";

const MainPage = () => {
  return (
    <Container fluid className="mainContainer">
      <Row className="navbar-containers">
        <Col md={4} className="bg-secondary2">
          <LeftSectionNavbar />
        </Col>
        <Col md={8} className="bg-secondary2 borderLeft">
          <RightSectionNavbar />
        </Col>
      </Row>
      <Row className="main-page-containers ">
        <Col md={4} className="bg-main">
          <LeftMainPage />
        </Col>
        <Col
          md={8}
          className="bg-main flex-utility flex-column justify-content-between borderLeft"
        >
          <RightMainPage />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
