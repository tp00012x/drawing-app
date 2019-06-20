import React from 'react'

function HomeButton(props) {
    const {styles, setAdminOrUser, params, children} = props;

    return (
        <button
            className={`ui ${styles.color} inverted button`}
            onClick={() => {
                setAdminOrUser(params)
            }}
        >
            {children}
        </button>
    )
}

export default HomeButton