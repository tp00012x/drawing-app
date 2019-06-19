import React from 'react'

class SelectRandomWinners extends React.Component {
    render() {
        const {handleOnClick} = this.props;

        return (
            <button
                className="ui black button"
                onClick={() => {
                    handleOnClick();
                }}
            >
                Select Random Winners
            </button>
        )
    }
}

export default SelectRandomWinners