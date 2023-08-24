import React from "react";
import splash from "../assets/splash.svg";
import logo from "../assets/logo.svg";
import "../styles/SplashScreen.css";

export const withSpalashScreen = (children: React.ReactElement) => {
  return (
    <div className="with-splash-screen-container">
      <div className="splash-screen-container">
        <img className="splash-logo" src={logo} alt="logo"></img>
        <img className="splash-cover" src={splash} alt=""></img>
      </div>
      {children}
    </div>
  );
};
