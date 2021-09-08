import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../App.css";


const Login = () => {
  //const [show, setShow] = useState(true);
  let history = useHistory();
  const [val, setVal] = useState({ username: "", password: "" });

  // getting values from the user
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setVal({ ...val, [name]: value });
  };

  // final submittion of form
  const handleSubmit = (e) => {
    e.preventDefault();
    let x = val;
    adminLog({ x });
  };

  const api_admin =
    "https://elctro-api.herokuapp.com/api/v1/shop/admin/user/login";

  // user login request
  const adminLog = ({ x }) => {
    fetch(api_admin, {
      method: "POST",
      body: JSON.stringify(x),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        let a = json.status;
        if (a === "Ok") success();
        else fail({ json });
      });
  };
  // login is failed
  const fail = ({ json }) => {
    alert(json.message);
  };

  // login is successfull
  const success = () => {
    localStorage.setItem("admin", JSON.stringify(val.username));
    history.push("/data");
  };
  return (
    <div className="main">
      <form className="login-main" onSubmit={handleSubmit}>
        <h2 id="login-h">Login</h2>
        <input
          className="inpt"
          type="text"
          autoComplete="off"
          name="username"
          placeholder="Username"
          onChange={handleInput}
          value={val.username}
        />
        <br />
        <input
          className="inpt"
          type="password"
          autoComplete="off"
          name="password"
          placeholder="Password"
          onChange={handleInput}
          value={val.password}
        />
        <br />
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
