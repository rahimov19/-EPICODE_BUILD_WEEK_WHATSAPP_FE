import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { submitLoginAction, submitRegisterAction } from "../../redux/actions";

const Auth = () => {
  const location = window.location.pathname;

  let isAuthenticated = useSelector((state) => state.chats.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const details =
    location === "/auth/login"
      ? {
          email: email.toLowerCase(),
          password: password,
        }
      : {
          username: username,
          email: email.toLowerCase(),
          password: password,
        };

  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmitLogin = (event) => {
    // here goes the fetch
    event.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    dispatch(submitLoginAction(details));
  };

  const handleSubmitRegister = (event) => {
    // here goes the fetch
    event.preventDefault();
    // console.log("Email:", email);
    // console.log("Password:", password);
    dispatch(submitRegisterAction(details));
  };
  if (isAuthenticated) {
    return <Navigate replace to={"/"} />;
  } else {
    return (
      <Container
        style={{ backgroundColor: "#111B21", maxWidth: "97%" }}
        fluid={true}
        className={"px-0"}
      >
        <Nav
          style={{
            height: "30vh",
            backgroundColor: "#00A884",
          }}
          className={"px-0 mx-0 text-white"}
        >
          <div className="d-flex justify-content-start align-items-start pt-5 pl-5">
            <div className="d-flex justify-content-center align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="39"
                height="39"
                viewBox="0 0 39 39"
                className="mr-3"
              >
                <path
                  fill="#00E676"
                  d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
                ></path>
                <path
                  fill="#FFF"
                  d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
                ></path>
              </svg>
              <div className={"text-white"}>WHATSAPP WEB</div>
            </div>
          </div>
        </Nav>
        <Row
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Col
            xs={12}
            md={4}
            className="text-center border rounded p-5 bg-white"
            style={{
              transform:
                location === "/auth/login"
                  ? "translate3d(0px, -100px, 0px)"
                  : "translate3d(0px, -140px, 0px)",
            }}
          >
            {location === "/auth/login" ? (
              <h1 className="text-dark"> LOGIN</h1>
            ) : (
              <h1 className="text-dark"> REGISTER</h1>
            )}
            <Form className="mt-5">
              {location === "/auth/register" ? (
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label className="text-dark">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    onChange={handleUsernameChange}
                  />
                  <Form.Text className="text-muted text-dark">
                    Username can be find by search
                  </Form.Text>
                </Form.Group>
              ) : (
                <></>
              )}

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-dark">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleEmailChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-dark mt-3">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  className="text-dark mt-3"
                />
              </Form.Group>
              <div className="d-flex justify-content-center align-items-center mt-5">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={
                    location === "/auth/login"
                      ? handleSubmitLogin
                      : handleSubmitRegister
                  }
                >
                  {location === "/auth/login" ? "Login" : "Register"}
                </Button>
                {location === "/auth/login" ? (
                  <Link to={"/auth/register"}>
                    <div className="d-flex justify-content-center align-self-center pl-5">
                      REGISTER
                    </div>
                  </Link>
                ) : (
                  <Link to={"/auth/login"}>
                    <div className="d-flex justify-content-center align-self-center pl-5">
                      LOGIN
                    </div>
                  </Link>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Auth;
