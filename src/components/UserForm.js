import '../scss/components/UserForm.scss';
import React, { Component, Fragment } from 'react'
import GoHomeButton from './GoHomeButton';
import UserInput from './UserInput';
import Message from './Message'
import pokemonCardPic from '../images/foiled_charizard.png'

class UserForm extends Component {
    state = {
        codeSubmitted: false,
        user: null
    };

    setUser = (user) => {
        this.setState({user: user});
    };

    renderContent() {
        const {codeSubmitted, user} = this.state;

        if (codeSubmitted) {
            return (
                <Message styles={{type: 'info'}}>
                    You have entered the drawing to win a Limited Edition Pokemon Card. Good luck!
                </Message>)
        } else if (user) {
            return user.is_winner ? (
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
                        codeSubmitted={() => this.setState({codeSubmitted: true})}
                        setUser={this.setUser}
                        user={user}
                    />
                </Fragment>)
        }
    }

    render() {
        return (
            <div className="user-form">
                <div className="user-form--column__left"/>
                <div className="user-form--column__right">
                    <div className="d-flex flex-column">
                        <div className="p-2">
                            {this.renderContent()}
                        </div>
                        <div className="p-2">
                            <GoHomeButton home={this.props.handleReset}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserForm;