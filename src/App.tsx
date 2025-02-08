// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignIn from "./pages/SingIn";
import SignUp from "./pages/SignUp";
// import ChatPage from "./pages/ChatPage";
import ChatApp from "./components/ChatApp";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Set true if user exists, else false
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  if (isAuthenticated === null) {
    // Optional: Show a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ChatApp />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


// // src/App.tsx
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import SignIn from "./pages/SingIn";
// import SignUp from "./pages/SignUp";
// import ChatPage from "./pages/ChatPage";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/" element={<ChatPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;