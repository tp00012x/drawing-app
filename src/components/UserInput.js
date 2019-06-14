import React from 'react'
import Message from './Message'


class UserInput extends React.Component {
    state = {
        isAlphanumeric: null,
        isBlank: true,
        isSixCharactersLong: false
    };

    isAlphanumeric(event) {
        const input_str = event.target.value;

        for (let i = 0; i < input_str.length; i++) {
            const code = input_str.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
                this.setState({isAlphanumeric: true});
            } else {
                this.setState({isAlphanumeric: false});
            }
        }
    }

    isEmpty(event) {
        event.target.value ? this.setState({inputIsBlank: false}) : this.setState({inputIsBlank: true});
    }

    isSixCharactersLong(event) {
        const input_len = event.target.value.length;

        if (input_len === 6) {
            this.setState({isSixCharactersLong: true})
        } else {
            this.setState({isSixCharactersLong: false})
        }
    }

    validateInput = (event) => {
        this.isAlphanumeric(event);
        this.isEmpty(event);
        this.isSixCharactersLong(event);
    };

    render() {
        return (
            <div>
                <div className="ui action input">
                    <input type="text" placeholder="Enter code" onChange={this.validateInput}/>
                    <select className="ui compact selection dropdown">
                        <option value="participate">Participate!</option>
                        <option value="check_status">Check status</option>
                    </select>
                    <div className={
                        `ui ${(this.state.isBlank && !this.state.isSixCharactersLong) && 'disabled'} black button`}
                    >
                        Submit
                    </div>
                </div>
                {
                    this.state.isAlphanumeric &&
                    <Message
                        styles={{type: 'negative'}}
                    >
                        You must enter only Alphanumeric characters
                    </Message>
                }
            </div>
        );
    }
}

export default UserInput
