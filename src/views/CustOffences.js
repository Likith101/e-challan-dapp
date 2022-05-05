import React from 'react';

class CustOffences extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            offences: false,
            offenceList: []
        }
    
        this.paymentHandler = this.paymentHandler.bind(this)
        this.reload = this.reload.bind(this)
    }

    async paymentHandler(id, fine) {
        this.props.payFunc(id, fine)
    }

    async componentDidMount() {

        if(this.props.offenceList.length != 0) {

            var offenceList = []

            for(var i = 0; i < this.props.offenceList.length; i++) {
                if(this.props.offenceList[i][2] != 0) {
                    offenceList.push(this.props.offenceList[i])
                }
            }
            
            if(offenceList.length != 0) {
                this.setState({
                    offences: true,
                    offenceList: offenceList
                })
            }
        }
    }

    async reload() {
        window.location.reload(false);
    }

    render() {
        
        if(this.state.offences == false) {
            return (
                <div>
                    <h2>
                        You do not have any unpaid offences
                    </h2>
                </div>
            )
        }
        else {

            return (
                <div>
                    <button onClick={this.reload}>
                        Click to Refresh Transactions
                    </button>
                    {this.state.offenceList.map((i) => <div key = {i[0]} className = "Offence">
                        <p>
                            Offence Id - {i[0]}
                        </p>
                        <p>
                            Offence Type - {i[1]}
                        </p>
                        <p>
                            Fine - {i[2]}
                        </p>
                        <button className="pay" onClick={() => this.paymentHandler(i[0], i[2])}>
                            Pay
                        </button>
                    </div>)}
                </div>
            )
        }
    }
}

export default CustOffences