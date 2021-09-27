import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  const getUserList = async () => {
    const res = await axios.get("http://localhost:5000/get_all");
    const resp = await axios.post("http://localhost:5000/login",{
      "name":"Jim",
      "password":"JimPW"
  });
  console.log(resp.data);
    console.log(res);
    console.log(res.data);
    setUsers(res.data);
  };
  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div className="App">
    <h1>HELLO</h1>
      {users &&
        users.map((user) => (
          <div>
            <div>Name: {user.name}</div>
            <div>password: {user.password}</div>
          </div>
        ))}
    </div>
  );
}

export default App;
