import React from 'react'

class SelectRandomWinners extends React.Component {

    async API(url) {
        const baseUrl = "/api/";
        const response = await fetch(baseUrl + url);

        return await response.json();
    }

    fetchUsers = () => {
        return this.API('users').then(data => data);
    };


    render() {
        const {setUsers} = this.props;

        return (
            <button
                className="ui black button"
                onClick={() => {
                    setUsers(this.fetchUsers())
                }}
            >
                Select Random Winners
            </button>
        )
    }
}

export default SelectRandomWinners