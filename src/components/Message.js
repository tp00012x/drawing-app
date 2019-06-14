import React from 'react'

function Message(props) {
    const {styles, children} = props;

    return (
        <div>
            <div className={`ui ${styles.type} message`}>
                <div className="header">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Message