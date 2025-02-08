import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../firebase/firebase"; // Adjust path based on your directory
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// Import images properly
import penIcon from "../assets/pen-icon.png";
import googleIcon from "../assets/google-icon.png";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const db = getFirestore();

  // Handle email/password sign-up
  const handleSignUp = async () => {
    try {
      if (!name.trim()) {
        throw new Error("Please enter your name.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update Firebase Auth profile with name
      await updateProfile(user, { displayName: name });

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });

      alert("Account created successfully!");
      navigate("/"); // Redirect to home or chat page
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  // Handle Google sign-up
  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user already exists in Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName || "Google User",
          email: user.email,
        });
      }

      alert("Signed in with Google!");
      navigate("/"); // Redirect to home or chat page
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  // Function to handle authentication errors
  const handleAuthError = (error: any) => {
    let errorMsg = "An error occurred. Please try again.";

    if (error.code === "auth/email-already-in-use") {
      errorMsg = "This email is already in use.";
    } else if (error.code === "auth/weak-password") {
      errorMsg = "Password should be at least 6 characters.";
    } else if (error.code === "auth/invalid-email") {
      errorMsg = "Please enter a valid email address.";
    } else if (error.message) {
      errorMsg = error.message;
    }

    setErrorMessage(errorMsg);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "25rem", borderRadius: "12px" }}>
        <div className="text-center mb-3">
          <img src={penIcon} alt="Pen Icon" style={{ height: "50px" }} />
        </div>
        <h4 className="text-center fw-bold">Sign Up</h4>
        <p className="text-center text-muted">Welcome to QuestNote! Sign up to get started.</p>

        {/* Google Sign-Up */}
        <button
          className="btn btn-light border w-100 mb-3 d-flex align-items-center justify-content-center"
          onClick={handleGoogleSignUp}
        >
          <img src={googleIcon} alt="Google Icon" style={{ height: "20px", marginRight: "10px" }} />
          Sign Up with Google
        </button>

        <div className="text-center my-2 text-muted">or create an account</div>

        {/* Name Field */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-3 input-group">
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger text-center py-1">{errorMessage}</div>
        )}

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-light border"
            onClick={() => navigate("/")} // Adjust navigation path if needed
          >
            Back to Home
          </button>
          <button className="btn btn-dark" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>

        {/* Log In Redirect */}
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <span className="text-primary" style={{ cursor: "pointer" }}>
              <a href="/signin"> Log In </a>
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default SignUp;



// // src/pages/SignUp.tsx
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SignUp: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="card p-4 shadow-lg" style={{ width: "25rem", borderRadius: "12px" }}>
//         <div className="text-center mb-3">
//           <img src="/paper-plane-icon.png" alt="Paper Plane" style={{ height: "50px" }} />
//         </div>
//         <h4 className="text-center fw-bold">Sign Up</h4>
//         <p className="text-center text-muted">Welcome to QuestNote! Sign up to get started.</p>

//         {/* Google Sign-Up */}
//         <button
//           className="btn btn-light border w-100 mb-3 d-flex align-items-center justify-content-center"
//         >
//           <img
//             src="/google-icon.svg"
//             alt="Google Icon"
//             style={{ height: "20px", marginRight: "10px" }}
//           />
//           Sign Up with Google
//         </button>

//         <div className="text-center my-2 text-muted">or create an account</div>

//         {/* Name Field */}
//         <div className="mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         {/* Email Field */}
//         <div className="mb-3">
//           <input
//             type="email"
//             className="form-control"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         {/* Password Field */}
//         <div className="mb-3 input-group">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="form-control"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             className="btn btn-outline-secondary"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </button>
//         </div>

//         {/* CAPTCHA Placeholder */}
//         <div className="mb-3 text-center">
//           <div className="p-2 border rounded bg-light">Cloudflare CAPTCHA Placeholder</div>
//         </div>

//         {/* Buttons */}
//         <div className="d-flex justify-content-between">
//           <button
//             className="btn btn-light border"
//           >
//             Back to Home
//           </button>
//           <button
//             className="btn btn-dark"
//           >
//             Sign Up
//           </button>
//         </div>

//         {/* Log In Redirect */}
//         <div className="text-center mt-3">
//           <small>
//             Already have an account? <span className="text-primary" style={{ cursor: "pointer" }}><a href="/signin"> Log In </a></span>
//           </small>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;





// with blue buttons 

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const SignUp = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: "#ffffff", // Plain white background for simplicity
//       }}
//     >
//       <div
//         style={{
//           textAlign: "center",
//           maxWidth: "400px",
//           width: "100%",
//           backgroundColor: "#fff",
//           padding: "30px",
//           borderRadius: "10px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <img
//           src="/assets/paper-plane-icon.png"
//           alt="Paper Plane"
//           style={{ width: "50px", marginBottom: "20px" }}
//         />
//         <h3 style={{ fontWeight: "bold", marginBottom: "10px" }}>Sign Up</h3>
//         <p style={{ color: "#6c757d", marginBottom: "20px" }}>
//           Welcome to QuestNote! Sign up to get started.
//         </p>

//         <button
//           className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center mb-3"
//         >
//           <img
//             src="/assets/google-icon.svg"
//             alt="Google Icon"
//             style={{ width: "20px", marginRight: "10px" }}
//           />
//           Sign Up with Google
//         </button>

//         <div style={{ marginBottom: "15px", color: "#6c757d" }}>
//           or create an account
//         </div>

//         <form>
//           <div className="mb-3">
//             <input
//               type="text"
//               placeholder="Name"
//               className="form-control"
//               style={{
//                 border: "1px solid #dee2e6",
//                 borderRadius: "5px",
//                 padding: "10px",
//               }}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               placeholder="Email"
//               className="form-control"
//               style={{
//                 border: "1px solid #dee2e6",
//                 borderRadius: "5px",
//                 padding: "10px",
//               }}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               placeholder="Password"
//               className="form-control"
//               style={{
//                 border: "1px solid #dee2e6",
//                 borderRadius: "5px",
//                 padding: "10px",
//               }}
//             />
//           </div>
//           <button className="btn btn-dark w-100" type="submit">
//             Sign Up
//           </button>
//         </form>

//         <div
//           style={{
//             marginTop: "15px",
//             fontSize: "14px",
//           }}
//         >
//           Already have an account?{" "}
//           <a href="/signin" style={{ color: "#007bff", textDecoration: "none" }}>
//             Log In
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;
