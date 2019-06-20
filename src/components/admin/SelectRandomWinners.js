import React from 'react'

class SelectRandomWinners extends React.Component {
    render() {
        const {handleOnClick, enoughParticipants} = this.props;

        return (
            <button
                className={`ui black button ${!enoughParticipants && 'disabled'}`}
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