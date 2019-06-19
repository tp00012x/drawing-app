import '../../scss/components/AdminForm.scss';
import React, { Component, Fragment } from 'react'
import UserList from "./UserList";
import GoHomeButton from '../GoHomeButton';
import SelectRandomWinners from './SelectRandomWinners';
import axios from 'axios';
import Message from "../Message";
import ResetWinners from "./ResetWinners"

class AdminForm extends Component {
    state = {
        participants: null,
        generatedWinners: false,
        enoughParticipants: false,
        didResetWinners: true,
        winners: null
    };

    // Sends PATCH request to set reset winners from our participants array in the server.js file
    resetWinners = async () => {
        try {
            const data = {reset: true};

            await axios.patch('/api/reset_participants', data);
            this.setState({didResetWinners: true});
        } catch (event) {
            console.log(`Axios PATCH reset winners request failed: ${event}`);
        }
    };

    // Sends PATCH request to set random winners from our participants array in the server.js file
    async setRandomWinners() {
        try {
            const data = {randomize: true, numberOfWinners: 5};

            await axios.patch('/api/set_random_winners', data);
            this.setState({generatedWinners: true, didResetWinners: false});
        } catch (event) {
            console.log(`Axios PATCH set random winners request failed: ${event}`);
        }
    };

    // Sends GET request to get all participants at any state
    async getParticipants() {
        try {
            const response = await axios.get('/api/participants');
            const participants = response.data;

            this.setState({participants});
        } catch (event) {
            console.log(`Axios GET participants request failed: ${event}`);
        }
    }

    // Given an array of participants, it returns an array of participants whose keys, is_winner, are true
    static getWinners(participants) {
        return participants.filter(participant => participant.is_winner);
    }

    handleOnClick = async () => {
        await this.getParticipants();

        if (this.state.participants.length >= 5) {
            await this.setRandomWinners();
            await this.getParticipants();

            const winners = AdminForm.getWinners(this.state.participants);

            this.setState({enoughParticipants: true, winners})
        }
    };


    render() {
        const {handleReset} = this.props;
        const {generatedWinners, enoughParticipants, participants, didResetWinners, winners} = this.state;

        //TODO fix so the message doesn't appear when trying to show the user list
        return (
            <div className="admin-form">
                <div className="admin-form--column__left center-content">
                    <div className="d-flex flex-column">
                        <div className="p-2">
                            {
                                (generatedWinners && enoughParticipants && !didResetWinners) && (
                                    <Fragment>
                                        <ResetWinners resetWinners={this.resetWinners}/>
                                        <UserList winners={winners}/>
                                    </Fragment>
                                )
                            }
                            {
                                didResetWinners && <SelectRandomWinners handleOnClick={this.handleOnClick}/>
                            }
                            {
                                (!enoughParticipants && participants) && (
                                    <Message styles={{type: 'negative'}}>
                                        There are not enough participants to select Random Winners!
                                    </Message>
                                )
                            }
                        </div>
                        <div className="p-2">
                            <GoHomeButton home={handleReset}/>
                        </div>
                    </div>
                </div>
                <div className="admin-form--column__right"/>
            </div>
        )
    }
}

export default AdminForm;