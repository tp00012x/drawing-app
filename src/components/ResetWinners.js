import React from 'react'

function ResetWinners(props) {
    return (
        <button
            className="ui labeled icon button"
            onClick={()=>{props.resetWinners()}}
        >
            <i className="sync icon"/>
            Reset Winners
        </button>
    )
}

export default ResetWinners;