const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

const app = express();
// initialise body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(cors());
app.listen(5000, () => {
  console.log(`Server is running at port 5000.`);
});

app.get("/helloworld", (req, res) => {
  res.send("HELLO WORLD!");
});

app.get("/get_all", (req, res) => {
  pool.query("SELECT * FROM users", [], (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
});

app.post("/login", (req, res) => {
  const { name, password } = req.body;

  pool.query(
    "select * from users where name= $1 and password = $2",
    [name, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows.length);
      res.send(results.rows);
    }
  );
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, password } = req.body;

  pool.query(
    "UPDATE users SET name = $1, password = $2 WHERE id = $3",
    [name, password, id],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.sendStatus(200).json(results.rows);
    }
  );
});

app.delete("/users", (req, res) => {
  const { id } = req.query;
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.sendStatus(200);
  });
});


