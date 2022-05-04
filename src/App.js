import React from 'react';
import CustLogin from './views/CustLogin';
import PoliceLogin from './views/PoliceLogin';
import Register from './views/Register';
import CustOffences from './views/CustOffences';
import FileOffence from './views/FileOffence';
import Web3 from 'web3';

import './App.css'

class App extends React.Component {
    constructor() {

        super();

        this.state = {
            userType: "none",
            loggedin: false,
            contract: null
        }

        this.switchLoginAsCust = this.switchLoginAsCust.bind(this)
        this.switchLoginAsPolice = this.switchLoginAsPolice.bind(this)
        this.registerAsCust = this.registerAsCust.bind(this)
        this.custLoginHandler = this.custLoginHandler.bind(this)
        this.policeLoginHandler = this.policeLoginHandler.bind(this)
        this.custRegisterHandler = this.custRegisterHandler.bind(this)
        this.logOut = this.logOut.bind(this)
        this.custPayHandler = this.custPayHandler.bind(this)
        this.addOffence = this.addOffence.bind(this)
    }

    async componentWillMount() {
        await this.loadWeb3()
        /*this.setState({
            contract: this.loadContract()
        })*/
    }
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else {
            window.alert('Metamask authentication Necessary for application')
        }
    }
    
    async loadContract() {
        return await new window.web3.eth.Contract()
    }
    
    async switchLoginAsCust() {
        this.setState({
            userType: "customer"
        })
    }

    async switchLoginAsPolice() {
        this.setState({
            userType: "police"
        })
    }

    async registerAsCust() {
        this.setState({
            userType: "register"
        })
    }

    async custLoginHandler(regNumber, password) {
        //add functionality for customer login
        this.setState({
            loggedin: true
        })
    }

    async policeLoginHandler(id, password) {
        //add functionality for police login
        this.setState({
            loggedin: true
        })
    }

    async custRegisterHandler(regNumber, password, email, phoneno, name) {
        //add functionality for customer registration
        this.setState({
            userType: "customer",
            loggedin: true
        })
    }

    async logOut() {
        this.setState({
            userType: "none",
            loggedin: false
        })
    }

    async custPayHandler(id) {
        //add functionality to pay for offence
        return 
    }

    async addOffence(location, offence, image) {
        //add functionality to add offences
        return
    }


    chooseLogin() {
        return (
            <div>
                <div className="chooseLogin">
                    <button className="b1" onClick={this.switchLoginAsCust}>
                        Login as Customer
                    </button>
                    <button className="b1" onClick={this.switchLoginAsPolice}>
                        Login as Police
                    </button>
                    <button className="b1" onClick={this.registerAsCust}>
                        Register as Customer
                    </button>
                </div>
            </div>
        )
    }

    custLogin() {
        return (
            <div>
                <CustLogin loginFunc = {this.custLoginHandler}/>
            </div>
        )
    }

    policeLogin() {
        return (
            <div>
                <PoliceLogin loginFunc = {this.policeLoginHandler}/>
            </div>
        )
    }

    register() {
        return (
            <div>
                <Register registerFunc = {this.custRegisterHandler}/>
            </div>
        )
    }
    
    custOffences() {
        return (
            <div>
                <div className="logOut">
                    <button onClick = {this.logOut}>
                        Logout
                    </button>
                </div>
                <CustOffences payFunc = {this.custPayHandler}/>
            </div>
        )
    }

    fileOffence() {
        return (
            <div>
                <div className="logOut">
                    <button onClick = {this.logOut}>
                        Logout
                    </button>
                </div>
                <FileOffence addOffence = {this.addOffenceHandler}/>
            </div>
        )
    }
    
    render() {
        if (this.state.loggedin) {
            if(this.state.userType == "customer") {
                return this.custOffences()
            }
            else if(this.state.userType == "police") {
                return this.fileOffence()
            }
        }
        else {
            if(this.state.userType == "none") {
                return this.chooseLogin()
            }
            else if (this.state.userType == "police") {
                return this.policeLogin()
            }
            else if (this.state.userType == "customer") {
                return this.custLogin()
            }
            else if (this.state.userType == "register") {
                return this.register()
            }
        }
    }

}

export default App