import '../scss/components/AdminForm.scss';
import React from 'react'
import UserList from "./UserList";
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

    setUsers = (promise) => {
        promise
            .then(newUsers => {
                const newState = Object.assign(this.state, {users: newUsers});
                this.setState(newState);
            })
            .then(() => {
                this.selectRandomWinners();
            });
    };

    resetWinners = () => {
        this.setState({didSelectedWinners: false})
    };

    render() {
        return (
            <div className="admin-form">
                <div className="admin-form--column__left center-content">
                    <div className="form--content">
                        {
                            !this.state.didSelectedWinners &&
                            <SelectRandomWinners
                                users={this.state.users}
                                setUsers={this.setUsers}
                            />
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