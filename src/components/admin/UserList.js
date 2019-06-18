import React from 'react'
import faker from 'faker';

const UserList = (props) => {
    const {winnersIds} = props;

    return (
        <div className="ui five column grid">
            {winnersIds.map((winnerId) => {
                return (
                    <div className="column" key={winnerId}>
                        <div className="ui fluid card">
                            <div className="image">
                                <img src={faker.image.avatar()} alt="user avatar"/>
                            </div>
                            <div className="content">
                                <a className="header" href={`/api/participant/${winnerId}`}>
                                    User: {winnerId}
                                </a>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
};

export default UserList;