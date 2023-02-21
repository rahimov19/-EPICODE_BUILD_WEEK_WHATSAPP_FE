import LeftMainPage from "./LeftMainPage";
import RightMainPage from "./RightMainPage";
import { Container, Col, Row } from "react-bootstrap";
import LeftSectionNavbar from "./LeftSectionNavbar";
import RightSectionNavbar from "./RightSectionNavbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchChatsAction, getMyUserDetailsAction } from "../redux/actions";
import { Navigate } from "react-router-dom";

const MainPage = () => {
  // const [accessToken, setAccessToken] = useState("");
  const dispatch = useDispatch();
  const chatList = useSelector((state) => state.chats.chatsStore);
  console.log("****", chatList);
  // const user = (state) => state.chats.user;
  const accessToken = useSelector((state) => state.chats.accessToken);
  console.log(accessToken);
  let isAuthenticated = useSelector((state) => state.chats.isAuthenticated);

  useEffect(() => {
    dispatch(getMyUserDetailsAction(accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchChatsAction(accessToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
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
  } else {
    return <Navigate replace to={"/auth/login"} />;
  }
};

export default MainPage;
