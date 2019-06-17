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
        user: null
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const selectedOption = this.state.selectedOption;

        if (selectedOption === "participate") {
            this.addUser();
        } else if (selectedOption === "check_status") {
            const user = await this.getUser();
            this.props.setUser(user);
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
        //todo make sure to display error if the user doesnt exist
        return fetch(`/api/users/${this.state.code}`)
            .then(res => res.json());
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

    render() {
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
                    <button className={`ui ${!this.state.enableSubmit && 'disabled'} black button`}>
                        Submit
                    </button>
                </div>
                {
                    (!this.state.isAlphanumeric && this.state.inputIsNotBlank) &&
                    <Message
                        styles={{type: 'negative'}}
                    >
                        You must enter only Alphanumeric characters
                    </Message>
                }
            </form>
        );
    }
}

export default UserInput
