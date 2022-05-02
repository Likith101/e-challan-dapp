import React from 'react';
import './CustLogin.css';

class CustLogin extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            regNumber: "",
            password: ""
        };

        this.regNumberHandler = this.regNumberHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    regNumberHandler(event) {
        
        this.setState({
            regNumber: event.target.value
        });
    }

    passwordHandler(event) {
        
        this.setState({
            password: event.target.value
        });
    }

    async submitHandler(e) {
        e.preventDefault()
        this.props.loginFunc(this.state.regNumber, this.state.password);
    }

    render() {

        return (
            <form onSubmit = {this.submitHandler}>
                <div className = "container">
                    <label>
                        <b>
                            Registration Number
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter Registration Number" name = "uname" onChange = {this.regNumberHandler} required/>

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

export default CustLogin