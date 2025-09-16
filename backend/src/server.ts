import express = require('express');
import cors = require('cors');
import type { User } from '../models/user';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let users: User[] = [
  { id: 1, name: 'Mike', gender: 'male', email: 'mike@example.com', telephone: '555-555-555' },
  { id: 2, name: 'Nik', gender: 'male', email: '', telephone: '' },
  { id: 3, name: 'Rose', gender: 'female', email: 'rose@example.com', telephone: '' },
  { id: 4, name: 'Julija', gender: 'female', email: '', telephone: '222-222-222' }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const newUser: User = { id: Date.now(), name: req.body.name, gender: req.body.gender, email: req.body.email, telephone: req.body.telephone };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  users = users.filter(user => user.id !== userId);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`🚀 API server running at http://localhost:${PORT}`);
});
