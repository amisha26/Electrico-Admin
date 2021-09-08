import React, { useState } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

const Header = () => {
  let history = useHistory();
  const [a, setA] = useState(false);
  const show = () => {
    const loggedInAdmin = localStorage.getItem("admin");
    if (loggedInAdmin) {
      setA(true);
    }
  };
  setInterval(show, 500);

  // logout admin
  const logoutAdmin = () => {
    localStorage.clear();
    setA(false);
    history.push("/");
  };

  const loginAdmin = () => {
    history.push("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-center">
        <a href="/" id="navbar-text">Electrico Admin Portal</a>
        {localStorage.getItem("admin") ? (
          <ul
            className="nav-links"
            style={{ cursor: "pointer" }}
            onClick={logoutAdmin}
          >
            Logout
          </ul>
        ) : (
          <ul
            className="nav-links"
            onClick={loginAdmin}
            style={{ cursor: "pointer" }}
          >
            Login
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
