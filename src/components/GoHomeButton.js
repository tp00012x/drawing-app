import React from 'react'

function GoHomeButton(props) {
    const {setAdminOrUser} = props;

    return (
        <button
            className="ui labeled icon button"
            onClick={() => {
                setAdminOrUser({isAdmin: false, isUser: false})
            }}
        >
            <i className="home icon"/>
            Home
        </button>
    )
}

export default GoHomeButton;