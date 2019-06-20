import '../scss/components/Buttons.scss';
import React from 'react'
import HomeButton from './HomeButton'


function HomeButtons(props) {
    const {setAdminOrUser} = props;

    return (
        <div className="buttons">
            <div className="ui inverted segment center-content full-height">
                <div className="ui large buttons">
                    <HomeButton styles={{color: 'black'}} setAdminOrUser={setAdminOrUser} params={{isAdmin: true}}>
                        Admin
                    </HomeButton>
                    <div className="or buttons__or"/>
                    <HomeButton styles={{color: 'red'}} setAdminOrUser={setAdminOrUser} params={{isUser: true}}>
                        User
                    </HomeButton>
                </div>
            </div>
        </div>
    )
}

export default HomeButtons;