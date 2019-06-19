import React, { Component, Fragment } from 'react'
import faker from 'faker';

class UserList extends Component {
    state = {
        winners: [],
        loading: true
    };

    async getWinnersAPI() {
        const response = await fetch('/api/participants');
        const participants = await response.json();

        // Send GET request to get all participants, and select only the ones whose is_winner keys are true
        return participants.filter(participant => participant.is_winner)
    }

    async componentDidMount() {
        //Fix memory leak
        const winners = await this.getWinnersAPI();
        this.setState({winners, loading: false});
    }

    render() {
        const {winners, loading} = this.state;

        return (
            <Fragment>
                {
                    (winners || !loading) ? (
                            <div className="ui five column grid">
                                {winners.map(({code, is_winner}) => {
                                    return is_winner && (
                                        <div className="column" key={code}>
                                            <div className="ui fluid card">
                                                <div className="image">
                                                    <img src={faker.image.avatar()} alt="user avatar"/>
                                                </div>
                                                <div className="content">
                                                    <a className="header" href={`/api/participant/${code}`}>
                                                        User: {code}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) :
                        <div>Loading...</div>
                }
            </Fragment>
        )
    }
}

export default UserList;