import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const res = axios.get("http://localhost:5000/get_all");
    console.log(res.data);
    setUsers(res.data);
  }, []);
  return (
    <div className="App">
      {users &&
        users.map((user) => {
          <div>
            <div>Name: {user.name}</div>
            <div>password: {user.password}</div>
          </div>;
        })}
    </div>
  );
}

export default App;
