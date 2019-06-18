import './scss/atomic.scss';
import './scss/form.scss';
import React from 'react';
import HomeButtons from './components/HomeButtons';
import UserForm from './components/user/UserForm';
import AdminForm from './components/admin/AdminForm'

class App extends React.Component {
    state = {
        is_admin: false,
        is_user: false,
    };

    handleReset = (params) => {
        this.setState(params);
    };
    render() {
        return (
            <div className="App">
                {!this.state.is_user && !this.state.is_admin && <HomeButtons handleReset={this.handleReset}/>}
                {this.state.is_admin && <AdminForm handleReset={this.handleReset}/>}
                {this.state.is_user && <UserForm handleReset={this.handleReset}/>}
            </div>
        );
    }
}

export default App;