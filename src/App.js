import React from 'react';
import axios from "axios";
import ContactList from './components/ContactList'

class App extends React.Component {
    state = {
        users: []
    };

    componentDidMount() {
        axios
            .get("/api/users")
            .then(response => {

                const newUsers = response.data.map(user => {
                    return {
                        id: user.id,
                        is_winner: user.name
                    };
                });

                // create a new "State" object without mutating the original State object.
                const newState = Object.assign({}, this.state, {
                    contacts: newUsers
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="App">
                <ContactList contacts={this.state.users}/>
            </div>
        );
    }
}

export default App;