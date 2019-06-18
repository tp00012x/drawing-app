import React from 'react'

function HomeButton(props) {
    const {styles, handleReset, params, children} = props;

    return (
        <button
            className={`ui ${styles.color} inverted button`}
            onClick={() => {
                handleReset(params)
            }}
        >
            {children}
        </button>
    )
}

export default HomeButton