import React from 'react'


const UserList = (props) => {
    return (
        <ul>
            {props.users.map(({id, is_winner}) => {
                return <li key={id}>{id}</li>
            })}
        </ul>
    )
};

export default UserList;