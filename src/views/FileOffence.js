import React from 'react';


class FileOffence extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            location: "",
            offence: "",
            fine: "",
        }

        this.locationHandler = this.locationHandler.bind(this)
        this.offenceHandler = this.offenceHandler.bind(this)
        this.fileHandler = this.fineHandler.bind(this)
    }

    async locationHandler(event) {
        this.setState({
            location: event.target.value
        })
    }

    async offenceHandler(event) {
        this.setState({
            offence: event.target.value
        })
    }
    
    async fineHandler(event) {
        this.setState({
            fine: event.target.value
        })
    }

    async submitHandler() {

        this.props.addOffence(this.state.location, this.state.offence, this.state.fine)
    }

    render()
    {
        return (
            <form>
                <div className = "container">
                    <label>
                        <b>
                            Location
                        </b>
                    </label>
                    
                    <input type = "text" placeholder = "Enter Location" name = "location" onChange = {this.locationHandler} required/>

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
                    
                    <button type="button" onSubmit = {this.submitHandler}>
                        Add offence
                    </button>
                </div>
            </form>
        );
    }
}

export default FileOffence