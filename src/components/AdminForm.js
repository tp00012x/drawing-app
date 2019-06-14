import '../scss/components/AdminForm.scss';
import React from 'react'
import UserList from "./UserList";
import axios from "axios";
import GoHomeButton from './GoHomeButton';
import ResetWinners from './ResetWinners';
import SelectRandomWinners from './SelectRandomWinners';


class AdminForm extends React.Component {
    state = {
        users: [],
        didSelectedWinners: false,
    };

    selectRandomWinners = () => {
        this.setState({didSelectedWinners: true})
    };

    resetWinners = () => {
        this.setState({didSelectedWinners: false})
    };

    fetchUsers() {
        axios
            .get("/api/users")
            .then(response => {
                const newUsers = response.data.map(user => {
                    return {
                        id: user.id,
                        is_winner: user.is_winner
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
            <div className="admin-form">
                <div className="admin-form--column__left center-content">
                    <div className="form--content">
                        {
                            !this.state.didSelectedWinners &&
                            <SelectRandomWinners selectRandomWinners={this.selectRandomWinners}/>
                        }
                        <div className="admin-form--content">
                            {
                                this.state.didSelectedWinners &&
                                <div>
                                    <div className="ta-c mb-2">
                                        <ResetWinners resetWinners={this.resetWinners}/>
                                    </div>
                                    <UserList users={this.state.users}/>
                                </div>
                            }
                        </div>
                        <div className="as-c">
                            <GoHomeButton home={this.props.handleReset}/>
                        </div>
                    </div>
                </div>
                <div className="admin-form--column__right"/>
            </div>
        )
    }
}

export default AdminForm;