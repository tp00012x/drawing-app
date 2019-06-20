const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const jsonParser = bodyParser.json();

// Example of how data is stored when a participant is added via a POST request.
// const participants = [
//     {code: '111111', is_winner: false},
//     {code: '222222', is_winner: false},
//     {code: '444444', is_winner: false},
//     {code: '777777', is_winner: false},
//     {code: '555555', is_winner: false},
// ];

const participants = [];

// Found a nice way to shuffle in this SOF post https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
};

// Selects random participants and set their is_winner key to true.
const setRandomWinners = (numberOfWinners) => {
    const arr = [...Array(participants.length).keys()];
    const shuffledArr = shuffle(arr);
    const newArr = shuffledArr.slice(0, numberOfWinners);

    for (let el of newArr) {
        participants[el].is_winner = true;
    }
};

// Resets participants to have their respective key, is_winner, be false, and empties out winners array.
const resetParticipants = () => {
    participants.forEach((participant) => {
        participant.is_winner = false
    });
};

// Gets the nearest winner to the given participant. The nearest winner is measured by order of sign up.
// Every time a participant enters the drawing, they will be pushed to the end of the array.
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