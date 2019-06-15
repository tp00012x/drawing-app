import React from 'react'
import axios from "axios";

class SelectRandomWinners extends React.Component {
    fetchUsers = () => {
        return axios
            .get("/api/users")
            .then(response => {
                return response.data.map(user => {
                        return {
                            id: user.id,
                            is_winner: user.is_winner
                        }
                    }
                );
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <button
                className="ui black button"
                onClick={() => {
                    this.props.setUsers(this.fetchUsers())
                }}
            >
                Select Random Winners
            </button>
        )
    }
}

export default SelectRandomWinners