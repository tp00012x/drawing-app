import '../scss/components/Buttons.scss';
import React from 'react'
import Button from './Button'


function Buttons(props) {
    return (
        <div className="buttons">
            <div className="ui inverted segment center-content full-height">
                <div className="ui large buttons">
                    <Button
                        styles={{color: 'black'}}
                        handleReset={props.handleReset}
                        params={{is_admin: true}}
                    >
                        Admin
                    </Button>
                    <div className="or buttons__or"/>
                    <Button
                        styles={{color: 'red'}}
                        handleReset={props.handleReset}
                        params={{is_user: true}}
                    >
                        User
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Buttons;