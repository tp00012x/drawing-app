import React from 'react'

function SelectRandomWinners(props) {
    return (
        <button
            className="ui black button"
            onClick={() => {
                props.selectRandomWinners()
            }}
        >
            Select Random Winners
        </button>
    )
}

export default SelectRandomWinners;