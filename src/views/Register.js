import React from 'react';
import './CustLogin.css';

class Register extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            regNumber: "",
            password: "",
            name: "",
            email: "",
            phoneno: 0,
        };

        this.regNumberHandler = this.regNumberHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.phonenoHandler = this.phonenoHandler.bind(this);
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

    nameHandler(event) {
        
        this.setState({
            name: event.target.value
        });
    }

    emailHandler(event) {
        
        this.setState({
            email: event.target.value
        });
    }

    phonenoHandler(event) {
        
        this.setState({
            phoneno: parseInt(event.target.value)
        });
    }

    async submitHandler(e) {
        e.preventDefault()
        //console.log(this.state)
        this.props.registerFunc(this.state.regNumber, this.state.password, this.state.email, this.state.name, this.state.phoneno);
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
                    <label>
                        <b>
                            Email
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter email" name = "email" onChange = {this.emailHandler} required/>
                    <label>
                        <b>
                            Phoneno
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter phoneno" name = "pno" onChange = {this.phonenoHandler} required/>
                    <label>
                        <b>
                            Name
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter name" name = "name" onChange = {this.nameHandler} required/>

                    <button type = "submit" onSubmit = {this.submitHandler}>
                        Register
                    </button>
                </div>
            </form>
        );
    }
}

export default Register