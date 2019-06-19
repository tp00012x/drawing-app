const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();
const participants = [
    {code: '111111', is_winner: false},
    {code: '222222', is_winner: false},
    {code: '444444', is_winner: false},
    {code: '777777', is_winner: false},
    {code: '555555', is_winner: false},
    {code: '666666', is_winner: false},
    {code: '333333', is_winner: false},
    {code: '888888', is_winner: false},
    {code: 'aaaaaa', is_winner: false},
    {code: 'ssssss', is_winner: false},
    {code: 'dddddd', is_winner: false},
    {code: 'ffffff', is_winner: false},
    {code: 'rrrrrr', is_winner: false},
    {code: 'tttttt', is_winner: false},
    {code: 'gggggg', is_winner: false},
    {code: 'bbbbbb', is_winner: false},

];

// Keep tracks of winner codes to aid with the selections of random winners.
const winners = [];

// Selects random participants and set their is_winner key to true.
const setRandomWinners = (numberOfWinners) => {
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

// Resets participants to have their respective key, is_winner, be false, and empties out winners array.
const resetParticipants = () => {
    participants.forEach((participant) => {
        participant.is_winner = false
    });

    winners.length = 0;
};

// Gets the nearest winner to the given participant.
const getAdjacentWinner = (participant) => {
    let index = participants.indexOf(participant);
    let winner;
    let awayDown = 0;
    let awayUp = 0;

    for (let x = index - 1; x >= 0; x--) {
        let currentParticipant = participants[x];
        awayDown += 1;
        if (currentParticipant.is_winner) {
            winner = currentParticipant;
            break
        }
    }
    for (let x = index + 1; x < participants.length; x++) {
        let currentParticipant = participants[x];
        awayUp += 1;
        if (currentParticipant.is_winner && awayUp <= awayDown) {
            winner = currentParticipant;
            break
        }
    }
    return winner
};

app.get('/api/participants', (req, res) => {
    res.json(participants);
});

app.get('/api/participant/:code', (req, res) => {
    // Validations stop non-unique code values from being added to the participants array during the POST request.
    // Thus, we return the first code that is found inside the participants array.
    const participant = participants.find((participant) => participant.code === req.params.code);
    const adjacentWinner = getAdjacentWinner(participant);

    res.json({participant, adjacentWinner});
});

app.patch('/api/set_random_winners', jsonParser, (req, res) => {
    // randomize: A boolean that is passed to this PATCH request.that confirms selection fo random winners
    // numberOfWinners: The amount of winners we want to set. Requirements specify that this value must be 5.
    const {randomize, numberOfWinners} = req.body;

    // Set random participants to have a is_winner key of true
    randomize && setRandomWinners(numberOfWinners);
    res.json('Generated random winners successfully.');
});

app.patch('/api/reset_participants', jsonParser, (req, res) => {
    // reset: A boolean that is passed to this PATCH request to confirm the reset of participants.
    const {reset} = req.body;

    reset && resetParticipants();
    res.json('Reset winners successfully.');
});

app.post('/api/add_participant', jsonParser, (req, res) => {
    participants.push(req.body);
    res.json('Participant was added to the drawing.');
});

app.listen(port, () => `Server running on port ${port}`);