import React from 'react'

class SelectRandomWinners extends React.Component {
    render() {
        const {setRandomWinners} = this.props;

        return (
            <button
                className="ui black button"
                onClick={() => {
                    setRandomWinners();
                }}
            >
                Select Random Winners
            </button>
        )
    }
}

export default SelectRandomWinners