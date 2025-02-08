// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
import ChatPage from "./pages/ChatPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;