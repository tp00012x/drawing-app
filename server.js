const express = require('express');

const app = express();
const port = 5000;

app.get('/api/users', (req, res) => {
    const users = [
        {id: '111111', is_winner: true},
        {id: '222222', is_winner: true},
        {id: '223456', is_winner: true},
        {id: '323456', is_winner: true},
        {id: '323455', is_winner: true},
    ];

    res.json(users);
});

app.listen(port, () => `Server running on port ${port}`);