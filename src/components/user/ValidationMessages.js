import React, { Fragment } from 'react'
import Message from "../Message";

function ValidationMessages(props) {
    const {isAlphanumeric, inputIsNotBlank, participantNotFound, participantAlreadyExists} = props.state;

    return (
        <Fragment>
            {
                (!isAlphanumeric && inputIsNotBlank) &&
                (<Message styles={{type: 'negative'}}> You must enter only Alphanumeric characters.</Message>)
            }
            {
                participantNotFound && (
                    <Message styles={{type: 'negative'}}>
                        This participant can't be found! Please check that the entered code is correct.
                    </Message>
                )

            }
            {
                participantAlreadyExists && (
                    <Message styles={{type: 'negative'}}>
                        This participant already exists. Please try different code!
                    </Message>
                )
            }
        </Fragment>
    )
}

export default ValidationMessages;