import React from 'react'
import faker from 'faker';

const UserList = (props) => {
    return (
        <div className="ui five column grid">
            {props.users.map(({id, is_winner}) => {
                return (
                    is_winner &&
                    <div className="column" key={id}>
                        <div className="ui fluid card">
                            <div className="image">
                                <img src={faker.image.avatar()} alt="user avatar"/>
                            </div>
                            <div className="content">
                                <a className="header" href={`/api/user/${id}`}>
                                    User: {id}
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