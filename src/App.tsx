import React from "react";
import Login from "./components/UserProfile/Login";
import Profile from "./components/UserProfile/Profile";
import SignUp from "./components/UserProfile/Signup";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Profile} />
        <Route path="login" Component={Login} />
        <Route path="profile" Component={Profile} />
        <Route path="register" Component={SignUp} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
