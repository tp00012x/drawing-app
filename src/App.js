import React from 'react';
import axios from "axios";
import UserList from './components/UserList'
import Buttons from './components/Buttons'

class App extends React.Component {
    state = {
        users: []
    };

    fetchUsers() {
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
                    users: newUsers
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.fetchUsers();
    }

    render() {
        return (
            <div className="App">
                <Buttons/>
                {/*<UserList users={this.state.users}/>*/}
            </div>
        );
    }
}

export default App;