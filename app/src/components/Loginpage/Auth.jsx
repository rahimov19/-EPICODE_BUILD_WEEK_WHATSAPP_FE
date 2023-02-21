import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { submitLoginAction, submitRegisterAction } from "../../redux/actions";

const Auth = () => {
  const location = window.location.pathname;

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
    console.log("Email:", email);
    console.log("Password:", password);
    dispatch(submitLoginAction(details));
  };

  const handleSubmitRegister = (event) => {
    // here goes the fetch
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    dispatch(submitRegisterAction(details));
  };

  return (
    <Container style={{ backgroundColor: "#25D366" }} fluid={true}>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={12} md={4} className="text-center border p-5">
          {location === "/auth/login" ? <h1> Login</h1> : <h1> Register</h1>}
          <Form className="mt-5">
            {location === "/auth/register" ? (
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  onChange={handleUsernameChange}
                />
                <Form.Text className="text-muted">
                  Username can be find by search
                </Form.Text>
              </Form.Group>
            ) : (
              <></>
            )}

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
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
                    register
                  </div>
                </Link>
              ) : (
                <Link to={"/auth/login"}>
                  <div className="d-flex justify-content-center align-self-center pl-5">
                    login
                  </div>
                </Link>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
