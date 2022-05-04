import React from 'react';

class CustOffences extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            offences: true,
            offenceList: this.props.offenceList
        }

        this.paymentHandler = this.paymentHandler.bind(this)
    }

    async paymentHandler(id) {
        this.props.payFunc(id)
    }

    render() {
        
        if(this.offences == undefined || this.offences == false || this.offences == []) {
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
                    {this.state.offenceList.map((i) => <div key = {i[0]} className = "Offence">
                        <p>
                            Offence Id - {i[0]}
                        </p>
                        <p>
                            Location - {i[1]}
                        </p>
                        <p>
                            Offence Type - {i[2]}
                        </p>
                        <p>
                            Fine - {i[3]}
                        </p>
                        <button className="pay" onClick={() => this.paymentHandler(i[0])}>
                            Pay
                        </button>
                    </div>)}
                </div>
            )
        }
    }
}

export default CustOffences