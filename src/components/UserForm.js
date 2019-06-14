import '../scss/components/UserForm.scss';
import React from 'react'
import GoHomeButton from './GoHomeButton';
import UserInput from './UserInput';
import Message from './Message'

class UserForm extends React.Component {
    render() {
        return (
            <div className="user-form">
                <div className="user-form--column__left"/>
                <div className="user-form--column__right center-content">
                    <div className="form--content">
                        <div className="form--content--message">
                            <Message
                                styles={{type: 'info'}}
                            >
                                <p>Instructions:</p>
                                <ul className="list">
                                    <li>Enter 6 digit code</li>
                                    <li>All characters must be Alphanumeric</li>
                                </ul>
                            </Message>
                        </div>
                        <UserInput/>
                        <div className="as-c">
                            <GoHomeButton home={this.props.handleReset}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserForm;