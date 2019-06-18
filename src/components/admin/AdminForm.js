import '../../scss/components/AdminForm.scss';
import React, { Component, Fragment } from 'react'
import UserList from "./UserList";
import GoHomeButton from '../GoHomeButton';
import ResetWinners from './ResetWinners';
import SelectRandomWinners from './SelectRandomWinners';

class AdminForm extends Component {
    state = {
        winnersIds: [],
        didSelectWinners: false,
        didResetWinners: false,
    };

    selectRandomWinners = async () => {
        await this.generateRandomWinners();
        const winnersIds = await this.getWinners();

        winnersIds && this.setState({winnersIds: winnersIds, didSelectWinners: true});
    };

    async generateRandomWinners() {
        fetch('/api/generate_random_winners', {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({randomize: true, numberOfWinners: 5}),
        })
            .then(res => res.json());
    }

    async getWinners() {
        return fetch('/api/winners')
            .then(res => res.json())
            .catch(() => new Array(0));
    }

    // Empties out winnersIds array
    resetWinners = () => {
        fetch('/api/reset_winners', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({resetWinners: true}),
        })
            .then(res => res.json());

        this.setState({didResetWinners: true})
    };

    render() {
        const {handleReset} = this.props;
        const {didSelectWinners, winnersIds, didResetWinners} = this.state;

        return (
            <div className="admin-form">
                <div className="admin-form--column__left center-content">
                    <div className="d-flex flex-column">
                        <div className="p-2">
                            {
                                (didSelectWinners && !didResetWinners)?
                                    <Fragment>
                                        <ResetWinners resetWinners={this.resetWinners}/>
                                        <UserList winnersIds={winnersIds}/>
                                    </Fragment> :
                                    <SelectRandomWinners selectRandomWinners={this.selectRandomWinners}/>
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