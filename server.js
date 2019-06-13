const express = require('express');

const app = express();
const port = 5000;

app.get('/api/users', (req, res) => {
    const users = [
        {id: '123456', is_winner: null},
        {id: '223456', is_winner: null},
        {id: '323456', is_winner: null},
    ];

    res.json(users);
});

app.listen(port, () => `Server running on port ${port}`);