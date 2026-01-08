const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
const { escapeLiteral } = require("pg");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (!rows.length) {
    return res.status(401).json({ error: "Usuário não encontrado." });
  }

  const valid = await bcrypt.compare(password, rows[0].password_hash);
  if (!valid) {
    return res.status(401).json({ error: "Senha inválida." });
  }

  const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)`,
    [name, email, hash]
  );

  res.status(201).json({ message: "Usuário criado" });
});

router.post("/", auth, async (req, res) => {
  const { type, duration, description } = req.body;

  await pool.query(
    `INSERT INTO focus_sessions (user_id, type, duration, description) VALUES ($1,$2,$3,$4)`,
    [req.user.id, type, duration, description]
  );

  res.json({ message: "Sessão registrada com sucesso." });
});

module.exports = router;
