import React, { Component, Fragment } from 'react';
import UserList from "./UserList";
import GoHomeButton from '../GoHomeButton';
import SelectRandomWinners from './SelectRandomWinners';
import axios from 'axios';
import Message from "../Message";
import ResetWinners from "./ResetWinners";
import Spinner from "../Spinner";

class AdminForm extends Component {
    state = {
        participants: [],
        enoughParticipants: false,
        loading: false
    };

    // Sends PATCH request to set reset winners from our participants array in the server.js file
    resetWinners = async () => {
        try {
            const data = {reset: true};
            const {setWinners} = this.props;

            await axios.patch('/api/reset_participants', data);
            setWinners(null);
        } catch (event) {
            console.log(`Axios PATCH reset winners request failed: ${event}`);
        }
    };

    // Sends PATCH request to set random winners from our participants array in the server.js file
    async setRandomWinners() {
        try {
            const data = {randomize: true, numberOfWinners: 5};

            await axios.patch('/api/set_random_winners', data);
        } catch (event) {
            console.log(`Axios PATCH set random winners request failed: ${event}`);
        }
    };

    // Sends GET request to get all participants at any state
    async getParticipants() {
        this.setState({loading: true});

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
        const winners = participants.filter(participant => participant.is_winner);

        return winners ? winners : null
    }

    // This method will run when the ResetWinners button is clicked. Validations are handled in the front-end.
    handleOnClick = async () => {
        await this.setRandomWinners();
        await this.getParticipants();

        const winners = AdminForm.getWinners(this.state.participants);
        const {setWinners} = this.props;

        winners && setWinners(winners);
        this.setState({loading: false});
    };

    // If there are not enough participants, we will disable the Select Random Winners button.
    async componentDidMount() {
        await this.getParticipants();

        this.state.participants.length >= 5 ?
            this.setState({enoughParticipants: true}) :
            this.setState({enoughParticipants: false});

        this.setState({loading: false});
    }

    render() {
        const {setAdminOrUser, winners} = this.props;
        const {enoughParticipants, loading} = this.state;

        return (
            <div className="d-flex full-height">
                <div className="f-1">
                    <div className="d-flex flex-column full-height justify-content-center align-items-center">
                        <div className="d-flex flex-column p-2">
                            {
                                winners ? (
                                        <Fragment>
                                            <ResetWinners resetWinners={this.resetWinners}/>
                                            <UserList winners={winners}/>
                                        </Fragment>
                                    ) :
                                    <SelectRandomWinners
                                        handleOnClick={this.handleOnClick}
                                        enoughParticipants={enoughParticipants}/>
                            }
                            {
                                loading && <Spinner/>
                            }
                            {
                                (!enoughParticipants) && (
                                    <Message styles={{type: 'negative'}}>
                                        There are not enough participants to select Random Winners!
                                    </Message>
                                )
                            }
                        </div>
                        <div className="p-2">
                            <GoHomeButton setAdminOrUser={setAdminOrUser}/>
                        </div>
                    </div>
                </div>
                <div className="f-1 dark-background"/>
            </div>
        )
    }
}

export default AdminForm;