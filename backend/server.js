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

// This tells the server to use Render's port, or 5000 if running locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));