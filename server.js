const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();
const users = [
    {id: '111111', is_winner: false},
    {id: '222222', is_winner: true},
    {id: '223456', is_winner: true},
    {id: '323456', is_winner: true},
    {id: '323455', is_winner: true},
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/user/:id', (req, res) => {
    res.json(users.find((user) => user.id === req.params.id));
});

app.post('/api/add_user', jsonParser, (req) => {
    req.method === 'POST' && users.push(req.body);
});

app.listen(port, () => `Server running on port ${port}`);