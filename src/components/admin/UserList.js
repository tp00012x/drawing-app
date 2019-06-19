import React from 'react'
import faker from 'faker';

function UserList(props) {
    const {winners} = props;

    return (
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
    )
}

export default UserList;