import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
const Auth = () => {
  return (
    <Container style={{ backgroundColor: "#25D366" }} fluid={true}>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Col xs={12} md={4} className="text-center">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
