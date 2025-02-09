import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChatApp = () => {
  const [showSidebar, setShowSidebar] = useState(true);
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
        {/* Sidebar */}
        {showSidebar && (
          <Col
            md={3}
            sm={12}
            className="bg-white shadow-sm p-3 position-relative d-md-block d-sm-none"
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <Button
              variant="light"
              className="position-absolute top-0 end-0 m-2 text-secondary border"
              onClick={() => setShowSidebar(false)}
              style={{ borderRadius: "50%" }}
            >
              ✖
            </Button>
            <ListGroup variant="flush" className="mb-4">
              <ListGroup.Item className="fw-bold fs-5 border-0">Hi, {userName}</ListGroup.Item>
              <ListGroup.Item action className="text-secondary border-0">
                Settings
              </ListGroup.Item>
              <ListGroup.Item action className="text-secondary border-0">
                Report Bug
              </ListGroup.Item>
              <ListGroup.Item action className="text-secondary border-0">
                Help
              </ListGroup.Item>
              <ListGroup.Item action className="text-secondary border-0">
                Refer a Friend
              </ListGroup.Item>
              <ListGroup.Item action className="text-secondary border-0">
                Exit to Home
              </ListGroup.Item>
              <ListGroup.Item
                action
                className="text-danger border-0"
                onClick={handleSignOut}
              >
                Sign Out
              </ListGroup.Item>
            </ListGroup>
          </Col>
        )}

        {/* Main Content */}
        <Col
          md={showSidebar ? 9 : 12}
          sm={12}
          className="d-flex flex-column justify-content-start align-items-center bg-white shadow-sm pt-3"
        >
          <div className="w-100 text-center mb-4">
            <Button
              variant="primary"
              className="d-md-none d-sm-block mb-3"
              onClick={() => setShowSidebar(true)}
            >
              ☰ Menu
            </Button>
            <h2 className="fw-bold text-primary">Good Afternoon, {userName}</h2>
          </div>
          {/* Buttons Section */}
          <Row className="justify-content-center w-100 g-3">
            <Col lg={4} md={6} sm={12} className="d-flex justify-content-center">
              <Button
                variant="outline-primary"
                className="shadow-sm w-100"
                style={{ minWidth: "12rem" }}
              >
                Teach me about the Quadratic Formula
              </Button>
            </Col>
            <Col lg={4} md={6} sm={12} className="d-flex justify-content-center">
              <Button
                variant="outline-primary"
                className="shadow-sm w-100"
                style={{ minWidth: "12rem" }}
              >
                Graph the Derivative of f(x) = x^2
              </Button>
            </Col>
            <Col lg={4} md={6} sm={12} className="d-flex justify-content-center">
              <Button
                variant="outline-primary"
                className="shadow-sm w-100"
                style={{ minWidth: "12rem" }}
              >
                Explain the structure of a plant cell
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Chat Input Toolbar */}
      <Row
        className="py-3 bg-white shadow-sm fixed-bottom"
        style={{ height: "80px" }}
      >
        <Col xs={12} className="text-center">
          <InputGroup className="w-100 px-3">
            <FormControl
              as="textarea"
              placeholder="Type your message..."
              className="bg-light px-3"
              style={{
                resize: "none",
                maxHeight: "10rem",
                minHeight: "2.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
              }}
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


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAuth, signOut } from "firebase/auth";
// import { Container, Row, Col, Button, ListGroup, FormControl, InputGroup } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const ChatApp = () => {
//   const [showSidebar, setShowSidebar] = useState(true);
//   const [userName, setUserName] = useState("User");
//   const auth = getAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (!user) {
//       navigate("/signin"); // Redirect to sign-in if no user is logged in
//     } else {
//       setUserName(user.displayName || "User");
//     }
//   }, [auth, navigate]);

//   const handleSignOut = async () => {
//     await signOut(auth);
//     navigate("/signin");
//   };

//   return (
//     <Container fluid className="vh-100 d-flex flex-column bg-light">
//       <Row className="flex-grow-1 overflow-hidden">
//         {/* Sidebar */}
//         {showSidebar && (
//           <Col
//             md={3}
//             className="bg-white shadow-sm p-3 position-relative"
//             style={{ height: "100vh", overflowY: "auto" }}
//           >
//             <Button
//               variant="light"
//               className="position-absolute top-0 end-0 m-2 text-secondary border"
//               onClick={() => setShowSidebar(false)}
//               style={{ borderRadius: "50%" }}
//             >
//               ✖
//             </Button>
//             <ListGroup variant="flush" className="mb-4">
//               <ListGroup.Item className="fw-bold fs-5 border-0">Hi, {userName}</ListGroup.Item>
//               <ListGroup.Item action className="text-secondary border-0">Settings</ListGroup.Item>
//               <ListGroup.Item action className="text-secondary border-0">Report Bug</ListGroup.Item>
//               <ListGroup.Item action className="text-secondary border-0">Help</ListGroup.Item>
//               <ListGroup.Item action className="text-secondary border-0">Refer a Friend</ListGroup.Item>
//               <ListGroup.Item action className="text-secondary border-0">Exit to Home</ListGroup.Item>
//               <ListGroup.Item action className="text-danger border-0" onClick={handleSignOut}>Sign Out</ListGroup.Item>
//             </ListGroup>
//           </Col>
//         )}

//         {/* Main Content */}
//         <Col
//           md={showSidebar ? 9 : 12}
//           className="d-flex flex-column justify-content-start align-items-center bg-white shadow-sm pt-3"
//         >
//           <h2 className="mb-4 fw-bold text-primary">Good Afternoon, {userName}</h2>
//           <div className="d-flex justify-content-center flex-wrap">
//             <Button variant="outline-primary" className="m-2 shadow-sm" style={{ width: "18rem" }}>
//               Teach me about the Quadratic Formula
//             </Button>
//             <Button variant="outline-primary" className="m-2 shadow-sm" style={{ width: "18rem" }}>
//               Graph the Derivative of f(x) = x^2
//             </Button>
//             <Button variant="outline-primary" className="m-2 shadow-sm" style={{ width: "18rem" }}>
//               Explain the structure of a plant cell
//             </Button>
//           </div>
//         </Col>
//       </Row>

//       {/* Chat Input Toolbar */}
//       <Row className="py-3" style={{ position: "fixed", bottom: "80px", width: "100%" }}>
//         <Col className="text-center">
//           <InputGroup className="w-50 mx-auto">
//             <FormControl
//               as="textarea"
//               placeholder="Type your message..."
//               className="bg-light px-3"
//               style={{ resize: "none", maxHeight: "10rem", minHeight: "2.5rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}
//             />
//             <Button
//               variant="dark"
//               className="ms-2 shadow-sm"
//               style={{ height: "2.5rem", width: "5rem", borderRadius: "0.5rem" }}
//             >
//               Send
//             </Button>
//           </InputGroup>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ChatApp;
