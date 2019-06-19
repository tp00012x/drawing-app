import React, { Component } from 'react'
import ValidationMessages from './ValidationMessages'
import axios from 'axios';


class UserInput extends Component {
    state = {
        code: null,
        participant: null,
        selectedOption: 'participate',
        isAlphanumeric: false,
        inputIsNotBlank: false,
        isSixCharactersLong: false,
        enableSubmit: false,
        participantNotFound: false,
        participantAlreadyExists: false,
        didSubmitParticipant: false
    };

    async getParticipant() {
        const {code} = this.state;
        const response = await axios.get(`/api/participant/${code}`);
        const participant = response.data;

        participant ? this.setState({participant}) : this.setState({participant: null});
    }

    async addParticipant() {
        const data = {code: this.state.code, is_winner: false};

        await axios.post('/api/add_participant', data);

        this.setState({didSubmitParticipant: true});
    }

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

    handleSubmit = async (event) => {
        event.preventDefault();
        await this.getParticipant();

        const {code, selectedOption, participant} = this.state;
        const {setParticipant, didSubmitParticipant} = this.props;

        if (selectedOption === "participate") {
            if (participant) {
                participant.code === code && this.setState({participantAlreadyExists: true})
            } else {
                await this.addParticipant();
                didSubmitParticipant();
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

        return (
            <form method="POST" onSubmit={this.handleSubmit}>
                <div className="ui action input">
                    <input type="text" placeholder="Enter code" name="code" onChange={this.handleOnInputChange}/>
                    <select
                        className="ui compact selection dropdown"
                        onChange={event => this.setState({selectedOption: event.target.value})}
                    >
                        <option value="participate">Participate!</option>
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
