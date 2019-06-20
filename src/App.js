import React from 'react';
import HomeButtons from './components/HomeButtons';
import UserForm from './components/user/UserForm';
import AdminForm from './components/admin/AdminForm'

class App extends React.Component {
    state = {
        isAdmin: false,
        isUser: false,
        winners: null
    };

    setWinners = (winners) => {
        this.setState({winners})
    };

    setAdminOrUser = (params) => {
        this.setState(params);
    };

    render() {
        const {winners} = this.state;

        return (
            <div className="App">
                {!this.state.isUser && !this.state.isAdmin && <HomeButtons setAdminOrUser={this.setAdminOrUser}/>}
                {this.state.isAdmin && (
                    <AdminForm
                        setAdminOrUser={this.setAdminOrUser}
                        setWinners={this.setWinners}
                        winners={winners}
                    />
                )}
                {this.state.isUser && <UserForm setAdminOrUser={this.setAdminOrUser} winners={winners}/>}
            </div>
        );
    }
}

export default App;