import React from 'react';


class FileOffence extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            userId: "",
            offence: "",
            fine: ""
        }

        this.userIdHandler = this.userIdHandler.bind(this)
        this.offenceHandler = this.offenceHandler.bind(this)
        this.fineHandler = this.fineHandler.bind(this)
    }

    async userIdHandler(event) {
        this.setState({
            userId: event.target.value
        })
    }

    async fineHandler(event) {
        this.setState({
            fine: event.target.value
        })
    }

    async offenceHandler(event) {
        this.setState({
            offence: event.target.value
        })
    }

    render()
    {
        return (
            <form>
                <div className = "container">
                    <label>
                        <b>
                            User Id
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter User Id" name = "userId" onChange = {this.userIdHandler} required/>

                    <label>
                        <b>
                            Offence
                        </b>
                    </label>
                    <input type = "text" placeholder = "Enter Offence Commited" name = "offence" onChange = {this.offenceHandler} required/>

                    <label>
                        <b>
                            Fine
                        </b>
                    </label>
                    <input type = "text" placeholder = "Enter Fine Amount" name = "fine" onChange = {this.fineHandler} required/>
                    
                    <button type="button" onClick = {this.props.addOffence.bind(null ,this.state.userId, this.state.offence, this.state.fine)}>
                        Add offence
                    </button>
                </div>
            </form>
        );
    }
}

export default FileOffence