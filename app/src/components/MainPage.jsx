import LeftMainPage from "./LeftMainPage";
import RightMainPage from "./RightMainPage";
import { Container, Col, Row } from "react-bootstrap";
import LeftSectionNavbar from "./LeftSectionNavbar";
import RightSectionNavbar from "./RightSectionNavbar";

const MainPage = () => {
  return (
    <Container fluid className="bg-info">
      <Row className="navbar-containers">
        <Col md={4} className="bg-warning">
          <LeftSectionNavbar />
        </Col>
        <Col md={8} className="bg-primary">
          <RightSectionNavbar />
        </Col>
      </Row>
      <Row className="main-page-containers">
        <Col md={4} className="bg-primary">
          <LeftMainPage />
        </Col>
        <Col
          md={8}
          className="bg-warning flex-utility flex-column justify-content-between h-100"
        >
          <RightMainPage />
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
