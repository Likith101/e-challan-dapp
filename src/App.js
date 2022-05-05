import React from 'react';
import CustOffences from './views/CustOffences';
import FileOffence from './views/FileOffence';
import Web3 from 'web3';

import './App.css'
import { timers } from 'node-libs-browser';

class App extends React.Component {
    constructor() {

        super();

        this.state = {
            userType: "none",
            loggedin: false,
            userAddress: null,
            owner: '0x8b050B73017cd3f045f1830632909385c680E92d',
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
                            "name": "_id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_offence",
                            "type": "string"
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
                            "name": "_id",
                            "type": "uint256"
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
                    "name": "withdraw",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [],
                    "name": "getBalance",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "_user",
                            "type": "address"
                        }
                    ],
                    "name": "getOffences",
                    "outputs": [
                        {
                            "components": [
                                {
                                    "internalType": "uint256",
                                    "name": "_id",
                                    "type": "uint256"
                                },
                                {
                                    "internalType": "string",
                                    "name": "_offence",
                                    "type": "string"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "_amount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Ticket.ticket[]",
                            "name": "",
                            "type": "tuple[]"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "getOwner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "name": "ticketHolder",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "_id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "_offence",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "_amount",
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

        var owner = await window.contract.methods.getOwner().call()

        if(owner == this.state.userAddress) {
            this.setState({
                userType: "police",
            })
        }
        else {
            var offences = await window.contract.methods.getOffences(this.state.userAddress).call()
            this.setState({
                offences: offences,
                userType: "customer"
            })
        }
    }
    
    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            
            var accounts = await window.web3.eth.getAccounts()

            this.setState({
                loggedin: true,
                userAddress: accounts[0]
            })
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

    async custPayHandler(id, fine) {
        await window.contract.methods.payTicketFine(this.state.userAddress, id, fine).send({from: this.state.userAddress})
        return 
    }

    async addOffence(userId, offence, fine) {
        var ticketId = Math.floor((Math.random() * 100) + 1);
        fine = parseInt(fine)
        console.log(userId, ticketId, offence, fine)
        await window.contract.methods.issueTicketsPolice(userId, ticketId, offence, fine).send({from: this.state.userAddress})
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
                <CustOffences payFunc = {this.custPayHandler} offenceList = {this.state.offences}/>
            </div>
        )
    }

    fileOffence() {
        return (
            <div>
                <FileOffence addOffence = {this.addOffence}/>
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
