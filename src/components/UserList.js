import React from 'react'


const ContactList = (props) => {
    return (
        <ul>
            {props.contacts.map(({id, is_winner}) => {
                return <li key={id}>{is_winner}</li>
            })}
        </ul>
    )
};

export default ContactList;