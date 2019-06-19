const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();
const participants = [
    {code: '111111', is_winner: true},
    {code: '222222', is_winner: false},
    {code: '333333', is_winner: false},
    {code: '444444', is_winner: false},
    {code: '555555', is_winner: false},
];

const winners = [];

const setRandomWinners = (participants, numberOfWinners) => {
    while (winners.length < numberOfWinners) {
        const randomParticipant = participants[Math.floor(Math.random() * participants.length)];

        if (!winners.includes(randomParticipant.code)) {
            winners.push(randomParticipant.code);
        }
    }

    for (let participant of participants) {
        if (winners.includes(participant.code)) {
            participant.is_winner = true;
        }
    }
};

app.get('/api/participants', (req, res) => {
    res.json(participants);
});

app.get('/api/participant/:code', (req, res) => {
    const participant = participants.find((participant) => participant.code === req.params.code);

    res.json(participant);
});

app.patch('/api/set_random_winners', jsonParser, (req) => {
    const {randomize, numberOfWinners} = req.body;

    randomize && setRandomWinners(participants, numberOfWinners);
});

app.post('/api/add_participant', jsonParser, (req, res) => {
    participants.push(req.body);
});

app.listen(port, () => `Server running on port ${port}`);