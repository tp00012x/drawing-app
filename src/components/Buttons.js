import '../scss/Buttons.scss';
import React from 'react'

const Buttons = () => {
    return (
        <div className="buttons">
            <div className="ui inverted segment buttons--center">
                <div className="ui large buttons">
                    <button className="ui inverted black button">Admin</button>
                    <div className="or buttons__or"></div>
                    <button className="ui inverted red button">User</button>
                </div>
            </div>
        </div>
    )
};

export default Buttons;