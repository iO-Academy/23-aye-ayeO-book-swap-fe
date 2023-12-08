import React from "react";
import logo from "../../logo.png";

function SplashScreen() {
  return (
    <div className="flex h-screen items-center justify-center bg-rose-100">
      <img
        src={logo}
        alt="Swapp logo"
        width="100px"
        className="animate-pulse"
      />
    </div>
  );
}

export default SplashScreen;
