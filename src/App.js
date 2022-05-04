import React from 'react';
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
            userAddress: null,
            owner: '0x7aFAf5aEc87b73057be97843B09a6C89d40953ac',
            offences: [],
            contractInfo: [
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "issueTicketsPolice",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
                            "type": "uint256"
                        }
                    ],
                    "name": "payTicketFine",
                    "outputs": [],
                    "stateMutability": "payable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "ticketHolders",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
                ]
        }

        this.switchLoginAsCust = this.switchLoginAsCust.bind(this)
        this.switchLoginAsPolice = this.switchLoginAsPolice.bind(this)
        this.registerAsCust = this.registerAsCust.bind(this)
        this.logOut = this.logOut.bind(this)
        this.custPayHandler = this.custPayHandler.bind(this)
        this.addOffence = this.addOffence.bind(this)
    }

    async componentWillMount() {
        await this.loadWeb3()
        window.contract = await this.loadContract()

        if(this.state.userType == "customer") {
            var offences = await window.contract.methods.getOffences(this.state.userAddress).call()
            this.setState({
                offences: offences
            })
        }
    }
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            
            var accounts = window.web3.eth.getAccounts()
            if(this.state.owner === accounts[0]) {
                this.setState({
                    loggedin: true,
                    userType: "police",
                    userAddress: accounts[0]
                })
            }
            else {
                
                this.setState({
                    loggedin: true,
                    userType: "customer",
                    userAddress: accounts[0]
                })
            }
        }
        else {
            window.alert('Metamask authentication Necessary for application')
        }
    }
    
    async loadContract() {
        return await new window.web3.eth.Contract(this.state.contractInfo, this.state.owner)
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

    async logOut() {
        this.setState({
            userType: "none",
            loggedin: false
        })
    }

    async custPayHandler(id) {
        await window.contract.methods.payTicketFine(this.state.userAddress, id).call()
        return 
    }

    async addOffence(location, offence, fine) {
        await window.contract.methods.issueTicketsPolice(location, offence, fine).call()
        return
    }
    
    home() {
        return (
            <div>
                <h2>
                    Please authenticate using Metamask
                </h2>
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
                <CustOffences payFunc = {this.custPayHandler} offenceList = {this.state.offences}/>
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
            return this.home()
        }
    }

}

export default App
