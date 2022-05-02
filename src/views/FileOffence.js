import React from 'react';


class FileOffence extends React.Component {
    
    constructor(props) {

        super(props);

        this.state = {
            offenceList: [["1", "drunk and driving"], ["2", "no helmet"]],
            location: "",
            offence: "",
            image: null,
        }

        this.locationHandler = this.locationHandler.bind(this)
        this.offenceHandler = this.offenceHandler.bind(this)
        this.fileHandler = this.fileHandler.bind(this)
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
    
    async fileHandler(event) {
        this.setState({
            image: event.target.files[0]
        })
    }

    async submitHandler() {

        this.props.addOffence(this.state.location, this.state.offence, this.state.image)
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
                            Offence Type
                        </b>
                    </label>

                    <select className='c1' onChange = {this.offenceHandler}>
                        {this.state.offenceList.map((i) => <option key = {i[0]} value = {i[1]}>{i[1]}</option>)}
                    </select>

                    <input type="file" onChange = {this.fileHandler}>
                    </input>

                    <button type="button" onSubmit = {this.submitHandler}>
                        Add offence
                    </button>
                </div>
            </form>
        );
    }
}

export default FileOffence