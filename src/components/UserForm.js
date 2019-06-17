import '../scss/components/UserForm.scss';
import React, { Component, Fragment } from 'react'
import GoHomeButton from './GoHomeButton';
import UserInput from './UserInput';
import Message from './Message'

class UserForm extends Component {
    state = {
        codeSubmitted: false,
        user: null
    };

    setUser = (user) => {
        this.setState({user: user});
    };

    renderContent() {
        if (this.state.codeSubmitted) {
            return (
                <Message styles={{type: 'positive'}}>
                    <p>You have entered the drawing. Good job!</p>
                </Message>)
        } else if (this.state.user) {
            const {is_winner} = this.state.user;

            return is_winner ? (
                <Message styles={{type: 'positive'}}>
                    <p>You've won. Congratulations!</p>
                </Message>
            ) : (
                <Message styles={{type: 'negative'}}>
                    <p>We apologize, but you didn't win. Please try again!</p>
                </Message>
            )
        } else {
            return (
                <Fragment>
                    <Message styles={{type: 'info'}}>
                        <p>Instructions:</p>
                        <ul className="list">
                            <li>Enter 6 digit code</li>
                            <li>All characters must be Alphanumeric</li>
                        </ul>
                    </Message>
                    <UserInput
                        codeSubmitted={() => this.setState({codeSubmitted: true})}
                        setUser={this.setUser}
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