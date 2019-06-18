import React from 'react'

function GoHomeButton(props) {
    const {home} = props;

    return (
        <button
            className="ui labeled icon button"
            onClick={() => {
                home({is_admin: false, is_user: false})
            }}
        >
            <i className="home icon"/>
            Home
        </button>
    )
}

export default GoHomeButton;