import './scss/atomic.scss';
import './scss/form.scss';
import React from 'react';
import Buttons from './components/Buttons';
import UserForm from './components/UserForm';
import AdminForm from './components/AdminForm'

class App extends React.Component {
    state = {
        is_admin: false,
        is_user: false,
    };

    handleReset = (event) => {
        this.setState(event);
    };
    render() {
        return (
            <div className="App">
                {!this.state.is_user && !this.state.is_admin && <Buttons handleReset={this.handleReset}/>}
                {this.state.is_admin && <AdminForm handleReset={this.handleReset}/>}
                {this.state.is_user && <UserForm handleReset={this.handleReset}/>}
            </div>
        );
    }
}

export default App;