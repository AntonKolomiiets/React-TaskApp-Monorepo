const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db/querys");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { generateKeyPair, SignJWT, jwtVerify } = require("jose");
// const authenticateToken = require("./functi");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

let publicKey, privateKey;
(async () => {
  const keys = await generateKeyPair("ES256");
  publicKey = keys.publicKey;
  privateKey = keys.privateKey;
  app.listen(PORT, () => console.log(`server is runnning on port ${PORT}`));
})();

//comfir token authenticity
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const { payload } = await jwtVerify(token, publicKey);
    req.user = payload; // Attach user info to request
    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    res.sendStatus(403); // Invalid token
  }
};


app.get("/tasks", authenticateToken, async (req, res) => {
  try {
    const tasks = await db.getAllTasks(req.user.id);
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/tasks", authenticateToken, async (req, res) => {
  const { title, description, status, due_date, priority } = req.body;

  const newTask = {
    user_id: req.user.id,
    title,
    description,
    status,
    due_date,
    priority,
  };

  console.log("Received new task:", newTask);

  try {
    await db.addTask(newTask);
    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: error.message });
  }
});

app.delete("/tasks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    await db.deleteTask(id);
    res.status(202).json({ message: `Deleted item with id: ${id}` });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date, priority } = req.body;
  console.log('hi there')
  const updates = {
    user_id: req.user.id,
    title,
    description,
    status,
    due_date,
    priority,
  };

  try {
    await db.editTask(id, updates);
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// signup
app.post("/signup", async (req, res) => {
  const { user_name, password } = req.body;
  console.log(user_name, password);
  try {
    // Check if username already exists
    const existingUser = await db.getUserByUsername(user_name);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = bcrypt.genSaltSync(4);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = { user_name, hash };

    // Save the new user and get the inserted user's id
    const [id] = await db.newUser(newUser);

    // Generate JWT token with user id
    const token = await new SignJWT({ id, user_name })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(privateKey);

    res.status(201).json({ id, token }); // Send token to client
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// login
app.post("/login", async (req, res) => {
  const { user_name, password } = req.body;
  console.log(user_name, password);

  try {
    const user = await db.getUserByUsername(user_name);
    if (!user || !bcrypt.compareSync(password, user.hash)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await new SignJWT({ id: user.id, user_name: user.user_name })
      .setProtectedHeader({ alg: "ES256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(privateKey);

    res.status(200).json({ token });
    console.log(token);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


