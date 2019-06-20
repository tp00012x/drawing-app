import pokemonCardPic from '../../images/foiled_charizard.png'
import React, { Component, Fragment } from 'react'
import GoHomeButton from '../GoHomeButton';
import UserInput from './UserInput';
import Message from '../Message'

class UserForm extends Component {
    state = {
        didSubmitParticipant: false,
        participant: null,
        adjacentWinner: null,
    };

    setParticipant = (participant) => {
        this.setState({participant});
    };

    setAdjacentWinner = (adjacentWinner) => {
        this.setState({adjacentWinner});
    };

    setDidSubmitParticipant = () => {
        this.setState({didSubmitParticipant: true})
    } ;

    renderContent() {
        const {didSubmitParticipant, participant, adjacentWinner} = this.state;
        const {winners} = this.props;

        if (didSubmitParticipant) {
            return (
                <Message styles={{type: 'info'}}>
                    You have entered the drawing to win a Limited Edition Pokemon Card. Good luck!
                </Message>)
        } else if (participant && winners) {
            return participant.is_winner ? (
                <Message styles={{type: 'positive'}}>
                    Congratulations, You've won the Limited Edition "Foiled Charizard"
                    <img className="ui medium rounded image p-2 display-1 margin-auto" src={pokemonCardPic} alt="poke"/>
                </Message>
            ) : (
                <Message styles={{type: 'negative'}}>
                    We apologize, but you didn't win. The nearest winner had a code of {adjacentWinner.code}. Please try
                    again, and good luck next time!
                </Message>
            )
        } else if (!participant) {
            return (
                <Fragment>
                    <Message styles={{type: 'compact'}}>
                        <p>Instructions:</p>
                        <ul className="list">
                            <li>Select from the drop down menu which action, you would like to take.</li>
                            <li>Enter your 6 digit code to enter drawing or check status {'\u2728'}</li>
                            <br/>
                            <p>* All characters must be Alphanumeric</p>
                        </ul>
                    </Message>
                    <UserInput
                        setDidSubmitParticipant={this.setDidSubmitParticipant}
                        setParticipant={this.setParticipant}
                        participant={participant}
                        winners={winners}
                        setAdjacentWinner={this.setAdjacentWinner}
                    />
                </Fragment>)
        } else if (!winners) {
            return (<Message styles={{type: 'info'}}>
                The winner has not been selected yet. Please check back later!
            </Message>)
        }
    }

    render() {
        const {setAdminOrUser} = this.props;

        return (
            <div className="d-flex full-height">
                <div className="f-1 dark-background"/>
                <div className="f-1">
                    <div className="d-flex flex-column justify-content-center full-height align-items-center">
                        <div className="p-2">
                            {this.renderContent()}
                        </div>
                        <div className="p-2">
                            <GoHomeButton setAdminOrUser={setAdminOrUser}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserForm;