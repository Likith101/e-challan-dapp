import React from 'react';
import './CustLogin.css';

class PoliceLogin extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            id: "",
            password: ""
        };

        this.idHandler = this.idHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    idHandler(event) {
        
        this.setState({
            id: event.target.value
        });
    }

    passwordHandler(event) {
        
        this.setState({
            password: event.target.value
        });
    }

    async submitHandler(e) {
        e.preventDefault()
        this.props.loginFunc(this.state.id, this.state.password);
    }

    render() {

        return (
            <form onSubmit = {this.submitHandler}>
                <div className = "container">
                    <label>
                        <b>
                            Identification Number
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter Identification Number" name = "uname" onChange = {this.idHandler} required/>

                    <label>
                        <b>
                            Password
                        </b>
                    </label>
                    
                    <input type = "password" placeholder = "Enter Password" name = "psw" onChange = {this.passwordHandler} required/>
        
                    <button type = "submit" onSubmit = {this.submitHandler}>
                        Login
                    </button>
                </div>
            </form>
        );
    }
}

export default PoliceLogin