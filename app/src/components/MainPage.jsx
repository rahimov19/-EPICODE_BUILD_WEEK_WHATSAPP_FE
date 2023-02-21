import LeftMainPage from "./LeftMainPage";
import RightMainPage from "./RightMainPage";
import { Container, Col, Row } from "react-bootstrap";
import LeftSectionNavbar from "./LeftSectionNavbar";
import RightSectionNavbar from "./RightSectionNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchChatsAction } from "../redux/actions";

const MainPage = () => {
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chats.chatsStore);
  const user = (state) => state.chats.user;

  useEffect(() => {
    dispatch(fetchChatsAction());
  }, []);

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
