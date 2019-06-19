import '../../scss/components/UserForm.scss';
import pokemonCardPic from '../../images/foiled_charizard.png'
import React, { Component, Fragment } from 'react'
import GoHomeButton from '../GoHomeButton';
import UserInput from './UserInput';
import Message from '../Message'

class UserForm extends Component {
    state = {
        didSubmitParticipant: false,
        participant: null
    };

    setParticipant = (participant) => {
        this.setState({participant});
    };

    renderContent() {
        const {didSubmitParticipant, participant} = this.state;

        if (didSubmitParticipant) {
            return (
                <Message styles={{type: 'info'}}>
                    You have entered the drawing to win a Limited Edition Pokemon Card. Good luck!
                </Message>)
        } else if (participant) {
            return participant.is_winner ? (
                <Message styles={{type: 'positive'}}>
                    Congratulations, You've won the Limited Edition "Foiled Charizard"
                    <img className="ui medium rounded image p-2" src={pokemonCardPic} alt="pokemon"/>
                </Message>
            ) : (
                <Message styles={{type: 'negative'}}>
                    We apologize, but you didn't win. Please try again, and good luck next time!
                </Message>
            )
        } else {
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
                        didSubmitParticipant={() => this.setState({didSubmitParticipant: true})}
                        setParticipant={this.setParticipant}
                        participant={participant}
                    />
                </Fragment>)
        }
    }

    render() {
        const {handleReset} = this.props;

        return (
            <div className="user-form">
                <div className="user-form--column__left"/>
                <div className="user-form--column__right">
                    <div className="d-flex flex-column">
                        <div className="p-2">
                            {this.renderContent()}
                        </div>
                        <div className="p-2">
                            <GoHomeButton home={handleReset}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserForm;