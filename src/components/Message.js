import React from 'react'

function Message(props) {
    const {styles, children} = props;

    return (
        <div className={`ui ${styles.type} message`}>
            <div className="header">
                {children}
            </div>
        </div>
    )
}

export default Message