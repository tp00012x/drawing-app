import React from 'react'

function UserInput() {
    return (
        <div className="ui action input">
            <input type="text" placeholder="Enter code"/>
            <select className="ui compact selection dropdown">
                <option value="participate">Participate!</option>
                <option value="check_status">Check status</option>
            </select>
            <div className="ui black button">Submit</div>
        </div>
    )
}

export default UserInput