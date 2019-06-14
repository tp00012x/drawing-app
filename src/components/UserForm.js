import '../scss/components/UserForm.scss';
import React from 'react'
import GoHomeButton from './GoHomeButton';
import UserInput from './UserInput';

class UserForm extends React.Component {
    render() {
        return (
            <div className="user-form">
                <div className="user-form--column__left"/>
                <div className="user-form--column__right center-content">
                    <div className="form--content">
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