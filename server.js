const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();
const participants = [
    {id: '111111', is_winner: false},
    {id: '222222', is_winner: false},
    {id: '333333', is_winner: false},
    {id: '444444', is_winner: false},
    {id: '555555', is_winner: false},
];

const winnersIds = [];

const setRandomWinners = (participants, numberOfWinners) => {
    while (winnersIds.length < numberOfWinners) {
        const randomParticipant = participants[Math.floor(Math.random() * participants.length)];

        if (!winnersIds.includes(randomParticipant.id)) {
            winnersIds.push(randomParticipant.id);
        }
    }
};

app.get('/api/participants', (req, res) => {
    res.json(participants);
});

app.get('/api/winners', (req, res) => {
    res.json(winnersIds);
});

app.get('/api/participant/:id', (req, res) => {
    res.json(participants.find((user) => user.id === req.params.id));
});

app.put('/api/reset_winners', jsonParser, (req, res) => {
    const {resetWinners} = req.body;

    if (resetWinners) {
        while (winnersIds.length) {
            winnersIds.pop();
        }
    }
});

app.patch('/api/generate_random_winners', jsonParser, (req) => {
    const {randomize, numberOfWinners} = req.body;

    randomize && setRandomWinners(participants, numberOfWinners);
    console.log(winnersIds);
});

app.post('/api/add_user', jsonParser, (req) => {
    req.method === 'POST' && participants.push(req.body);
});

app.listen(port, () => `Server running on port ${port}`);