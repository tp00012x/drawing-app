import './scss/atomic.scss';
import './scss/form.scss';
import React from 'react';
import HomeButtons from './components/HomeButtons';
import UserForm from './components/user/UserForm';
import AdminForm from './components/admin/AdminForm'

class App extends React.Component {
    state = {
        isAdmin: false,
        isUser: false,
        generatedWinners: false
    };

    setGeneratedWinners = (bool) => {
        this.setState({generatedWinners: bool})
    };

    setAdminOrUser = (params) => {
        this.setState(params);
    };

    render() {
        const {generatedWinners} = this.state;

        return (
            <div className="App">
                {!this.state.isUser && !this.state.isAdmin && <HomeButtons setAdminOrUser={this.setAdminOrUser}/>}
                {this.state.isAdmin && (
                    <AdminForm
                        setAdminOrUser={this.setAdminOrUser}
                        setGeneratedWinners={this.setGeneratedWinners}
                        generatedWinners={{generatedWinners}}
                    />
                )}
                {this.state.isUser && <UserForm setAdminOrUser={this.setAdminOrUser} generatedWinners={generatedWinners}/>}
            </div>
        );
    }
}

export default App;