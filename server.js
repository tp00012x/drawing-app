const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();
const participants = [
    {code: '111111', is_winner: false},
    {code: '222222', is_winner: false},
    {code: '333333', is_winner: false},
    {code: '444444', is_winner: false},
    {code: '555555', is_winner: false},
];

// Keep tracks of winner codes to aid with the selections of random winners.
const winners = [];

// Selects random participants and set their is_winner key to true.
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
    // Validations stop non-unique code values from being added to the participants array during the POST request.
    // Thus, we return the first code that is found inside the participants array.
    const participant = participants.find((participant) => participant.code === req.params.code);

    res.json(participant);
});

app.patch('/api/set_random_winners', jsonParser, (req, res) => {
    // randomize: A boolean that is passed to this PATCH request.
    // numberOfWinners: The amount of winners we want to set. Requirements specify that this value must be 5.
    const {randomize, numberOfWinners} = req.body;

    // Set random participants to have a is_winner key of true
    randomize && setRandomWinners(participants, numberOfWinners);
    res.json('Generated random winners successfully.');
});

app.post('/api/add_participant', jsonParser, (req, res) => {
    participants.push(req.body);
    res.json('Participant was added to the drawing.');
});

app.listen(port, () => `Server running on port ${port}`);