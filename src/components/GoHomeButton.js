import React from 'react'

function GoHomeButton(props) {
    return (
        <button
            className="ui labeled icon button"
            onClick={() => {
                props.home({is_admin: false, is_user: false})
            }}
        >
            <i className="home icon"/>
            Home
        </button>
    )
}

export default GoHomeButton;