import React from 'react'

function ResetWinners(props) {
    const {resetWinners} = props;

    return (
        <button
            className="ui labeled icon button"
            onClick={() => {
                resetWinners()
            }}
        >
            <i className="sync icon"/>
            Reset Winners
        </button>
    )
}

export default ResetWinners;