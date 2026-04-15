const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  // Simple check for lab purposes
  if(email === "admin@test.com" && password === "123456") {
    const token = jwt.sign({ email, role: 'admin' }, 'secret', { expiresIn: '1h' });
    return res.json({ token });
  }
  res.status(401).send("Fail");
});

app.listen(5000, () => console.log("Server on 5000"));