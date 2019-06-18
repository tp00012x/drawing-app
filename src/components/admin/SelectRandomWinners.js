import React from 'react'

class SelectRandomWinners extends React.Component {
    render() {
        const {selectRandomWinners} = this.props;

        return (
            <button
                className="ui black button"
                onClick={() => {
                    selectRandomWinners();
                }}
            >
                Select Random Winners
            </button>
        )
    }
}

export default SelectRandomWinners