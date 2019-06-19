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
        generatedWinners: false
    };

    setGeneratedWinners = () => {
        this.setState({generatedWinners: true})
    };

    handleReset = (params) => {
        this.setState(params);
    };

    render() {
        const {generatedWinners} = this.state;

        return (
            <div className="App">
                {!this.state.is_user && !this.state.is_admin && <HomeButtons handleReset={this.handleReset}/>}
                {this.state.is_admin && (
                    <AdminForm
                        handleReset={this.handleReset}
                        setGeneratedWinners={this.setGeneratedWinners}
                        generatedWinners={{generatedWinners}}
                    />
                )}
                {this.state.is_user && <UserForm handleReset={this.handleReset} generatedWinners={generatedWinners}/>}
            </div>
        );
    }
}

export default App;