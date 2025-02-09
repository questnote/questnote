import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Container, Row, Col, Button, ListGroup, FormControl, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatApp = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [userName, setUserName] = useState("User");
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/signin"); // Redirect to sign-in if no user is logged in
    } else {
      setUserName(user.displayName || "User");
    }
  }, [auth, navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <Container fluid className="vh-100 d-flex flex-column bg-light">
      <Row className="flex-grow-1 overflow-hidden">
        {/* Sidebar Toggle Button */}
        <Button
          variant="primary"
          className="position-fixed top-0 start-0 m-3 z-3"
          onClick={() => setShowSidebar(true)}
          style={{ zIndex: 1050 }}
        >
          ☰ {/* Simple icon for toggle */}
        </Button>

        {/* Sidebar */}
        <div
          className={`position-fixed top-0 start-0 bg-white shadow h-100 p-3 transition-all ${
            showSidebar ? "d-block" : "d-none"
          }`}
          style={{ width: "250px", zIndex: 1040 }}
        >
          <Button
            variant="light"
            className="position-absolute top-0 end-0 m-2 text-secondary border"
            onClick={() => setShowSidebar(false)}
            style={{ borderRadius: "50%" }}
          >
            ✖ {/* Simple close icon */}
          </Button>
          <ListGroup variant="flush" className="mb-4 mt-4">
            <ListGroup.Item className="fw-bold fs-5 border-0">Hi, {userName}</ListGroup.Item>
            <ListGroup.Item action className="text-secondary border-0">Settings</ListGroup.Item>
            <ListGroup.Item action className="text-secondary border-0">Report Bug</ListGroup.Item>
            <ListGroup.Item action className="text-secondary border-0">Help</ListGroup.Item>
            <ListGroup.Item action className="text-secondary border-0">Refer a Friend</ListGroup.Item>
            <ListGroup.Item action className="text-secondary border-0">Exit to Home</ListGroup.Item>
            <ListGroup.Item action className="text-danger border-0" onClick={handleSignOut}>Sign Out</ListGroup.Item>
          </ListGroup>
        </div>

        {/* Main Content */}
        <Col
          className="d-flex flex-column justify-content-start align-items-center bg-white shadow-sm pt-3"
          style={{ marginLeft: showSidebar ? "250px" : "0", transition: "margin-left 0.3s ease" }}
        >
          <h2 className="mb-4 fw-bold text-primary">Good Afternoon, {userName}</h2>
          <div className="d-flex justify-content-center flex-wrap">
            <Button variant="outline-primary" className="m-2 shadow-sm" style={{ width: "18rem" }}>
              Teach me about the Quadratic Formula
            </Button>
            <Button variant="outline-primary" className="m-2 shadow-sm" style={{ width: "18rem" }}>
              Graph the Derivative of f(x) = x^2
            </Button>
            <Button variant="outline-primary" className="m-2 shadow-sm" style={{ width: "18rem" }}>
              Explain the structure of a plant cell
            </Button>
          </div>
        </Col>
      </Row>

      {/* Chat Input Toolbar */}
      <Row className="py-3" style={{ position: "fixed", bottom: "80px", width: "100%" }}>
        <Col className="text-center">
          <InputGroup className="w-50 mx-auto">
            <FormControl
              as="textarea"
              placeholder="Type your message..."
              className="bg-light px-3"
              style={{ resize: "none", maxHeight: "10rem", minHeight: "2.5rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}
            />
            <Button
              variant="dark"
              className="ms-2 shadow-sm"
              style={{ height: "2.5rem", width: "5rem", borderRadius: "0.5rem" }}
            >
              Send
            </Button>
          </InputGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatApp;
