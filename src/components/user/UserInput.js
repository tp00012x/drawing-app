import React, { Component } from 'react'
import ValidationMessages from './ValidationMessages'
import axios from 'axios';


class UserInput extends Component {
    state = {
        code: null,
        participant: null,
        selectedOption: this.props.generatedWinners ? 'check_status': 'participate',
        isAlphanumeric: false,
        inputIsNotBlank: false,
        isSixCharactersLong: false,
        enableSubmit: false,
        participantNotFound: false,
        participantAlreadyExists: false
    };

    // Sends GET request to get a participant using code entered
    async getParticipant() {
        try {
            const {code} = this.state;
            const response = await axios.get(`/api/participant/${code}`);
            const participant = response.data;

            participant ? this.setState({participant}) : this.setState({participant: null});
        } catch (event) {
            console.log(`Axios GET participant request failed: ${event}`);
        }
    }

    // Sends POST request to add a participant to the participant array inside server.js
    async addParticipant() {
        try {
            const data = {code: this.state.code, is_winner: false};

            await axios.post('/api/add_participant', data);
        } catch (event) {
            console.log(`Axios POST request failed: ${event}`);
        }

    }

    // Deals with the validation of input field on input change. Submit button is disabled until all validations pass.
    handleOnInputChange = (event) => {
        const {value} = event.target;
        const isAlphanumeric = /^[a-z0-9]+$/i.test(value);
        const isSixCharactersLong = value && value.length === 6;
        const inputIsNotBlank = Boolean(value);

        this.setState({enableSubmit: false, participantAlreadyExists: false, participantNotFound: false});
        this.setState({isAlphanumeric, isSixCharactersLong, inputIsNotBlank});

        if (inputIsNotBlank && isAlphanumeric && isSixCharactersLong) {
            this.setState({code: value, enableSubmit: true});
        }
    };

    // Handles the Submit logic after input field has been validated depending on the selected Option
    handleSubmit = async (event) => {
        event.preventDefault();
        await this.getParticipant();

        const {code, selectedOption, participant} = this.state;
        const {setParticipant, setDidSubmitParticipant} = this.props;

        if (selectedOption === "participate") {
            if (participant) {
                participant.code === code && this.setState({participantAlreadyExists: true})
            } else {
                await this.addParticipant();
                setDidSubmitParticipant();
            }
        } else if (selectedOption === "check_status") {
            if (participant) {
                participant.code === code && setParticipant(participant)
            } else {
                this.setState({participantNotFound: true})
            }
        }
    };

    render() {
        const {enableSubmit} = this.state;
        const {generatedWinners} = this.props;

        return (
            <form method="POST" onSubmit={this.handleSubmit}>
                <div className="ui action input">
                    <input type="text" placeholder="Enter code" name="code" onChange={this.handleOnInputChange}/>
                    <select
                        className="ui compact selection dropdown"
                        onChange={event => this.setState({selectedOption: event.target.value})}
                    >
                        {!generatedWinners && <option value="participate">Participate!</option>}
                        <option value="check_status">Check status</option>
                    </select>
                    <button className={`ui ${!enableSubmit && 'disabled'} black button`}>Submit</button>
                </div>
                <ValidationMessages state={this.state}/>
            </form>
        );
    }
}

export default UserInput
