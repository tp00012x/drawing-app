import '../../scss/components/AdminForm.scss';
import React, { Component } from 'react'
import UserList from "./UserList";
import GoHomeButton from '../GoHomeButton';
import SelectRandomWinners from './SelectRandomWinners';

class AdminForm extends Component {
    state = {
        generatedWinners: false,
    };

    setRandomWinners = () => {
        // Send PATCH request to simulate the modification of existing participants and making their is_winner key, true
        fetch('/api/set_random_winners', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({randomize: true, numberOfWinners: 5}),
        })
            .then(res => res.json());

        this.setState({generatedWinners: true});
    };

    render() {
        const {handleReset} = this.props;
        const {generatedWinners} = this.state;

        return (
            <div className="admin-form">
                <div className="admin-form--column__left center-content">
                    <div className="d-flex flex-column">
                        <div className="p-2">
                            {
                                generatedWinners ?
                                    <UserList/> :
                                    <SelectRandomWinners setRandomWinners={this.setRandomWinners}/>
                            }
                        </div>
                        <div className="p-2">
                            <GoHomeButton home={handleReset}/>
                        </div>
                    </div>
                </div>
                <div className="admin-form--column__right"/>
            </div>
        )
    }
}

export default AdminForm;