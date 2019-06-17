import React from 'react'
import Message from './Message'

class UserInput extends React.Component {
    state = {
        code: null,
        isAlphanumeric: null,
        inputIsNotBlank: false,
        isSixCharactersLong: false,
        selectedOption: 'participate',
        enableSubmit: false,
        userNotFound: null,
        userAlreadyExists: null
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const selectedOption = this.state.selectedOption;
        const user = await this.getUser();

        if (selectedOption === "participate") {
            user ? this.setState({userAlreadyExists: true}) : this.addUser();
        } else if (selectedOption === "check_status") {
            user === undefined ? this.setState({userNotFound: true}) : this.props.setUser(user);
        }
    };

    addUser() {
        const data = {id: this.state.code, is_winner: true};

        fetch('/api/add_user', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json());

        this.props.codeSubmitted();
    }

    async getUser() {
        return fetch(`/api/user/${this.state.code}`)
            .then(res => res.json())
            .catch(() => undefined); //Return undefined for farther validation if we can't find the user
    };

    handleOnInputChange = (event) => {
        const {value} = event.target;
        const isAlphanumeric = /^[a-z0-9]+$/i.test(value);
        const isSixCharactersLong = value && value.length === 6;
        const inputIsNotBlank = Boolean(value);

        this.setState({enableSubmit: false});
        this.setState({isAlphanumeric, isSixCharactersLong, inputIsNotBlank});

        if (inputIsNotBlank && isAlphanumeric && isSixCharactersLong) {
            this.setState({code: value, enableSubmit: true});
        }
    };

    renderValidationMessage() {
        const {isAlphanumeric, inputIsNotBlank, userNotFound, userAlreadyExists} = this.state;

        if (!isAlphanumeric && inputIsNotBlank) {
            return (
                <Message styles={{type: 'negative'}}> You must enter only Alphanumeric characters.</Message>
            )
        } else if (userNotFound) {
            return (
                <Message styles={{type: 'negative'}}>
                    This user can't be found! Please check that the entered code is correct.
                </Message>)
        } else if (userAlreadyExists) {
            return (
                <Message styles={{type: 'negative'}}>User already exists. Please try different code!</Message>)
        }
    }

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
                {this.renderValidationMessage()}
            </form>
        );
    }
}

export default UserInput
