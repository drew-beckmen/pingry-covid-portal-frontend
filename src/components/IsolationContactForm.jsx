import React from 'react'; 
import Select from 'react-select'; 

class IsolationContactFrom extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            contacts: [],
            exposure: undefined,
            is_vaccinated: false
        }
    }

    // getListOptions = () => {
    //     return this.props.list.map(s => <option key={`${s.id}`} value={`${s.id}`}>{s.name}</option>) 
    // }

    addSingleStudent = () => {
        return (<div>
            <select className="selectpicker" data-live-search="true">
            {this.props.list}
            </select>
        </div>)
    }

    onChange = (val) => {
        this.setState({contacts: val}, () => console.log(this.state)) 
    }

    handleDateChange = (e) => {
        let {value} = e.target
        this.setState({exposure: value}, () => console.log(this.state))
    }

    handleIsVaccinated = (e) => {
        this.setState({is_vaccinated: e.target.checked}, () => console.log(this.state))
    }

    handleSubmit = (e) => {
        this.props.handleSubmit(e, this.state.contacts, this.state.exposure, this.state.is_vaccinated)
    }

    render() {
        return (
            <div>
                <br/>
                <hr/>
                <h5>Please enter {this.props.currentStudent}'s contacts.</h5>
                <h6>They will automatically be logged as new quarantines and email notifications are sent automatically.</h6>
                <p>This feature should ONLY be used if {this.props.currentStudent} is currently in isolation and new contacts have been discovered.</p>
                <Select
                    isSearchable={true}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                    options={this.props.list}
                    onChange={this.onChange}
                />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Date of Exposure for ENTIRE Group of People:</label>
                        <input className="form-control" type="date" name="date_exposure" value={this.state.exposure} onChange={this.handleDateChange}/>
                        <label>Is this just a contact since all of the individuals above are vaccinated?:</label>
                        <input id="is_vaccinated" className="form-control" type="checkbox" name="is_vaccinated" onChange={this.handleIsVaccinated}/>
                        <input className="form-control" type="submit" value="Submit" />
                    </div>
                </form>
                
            </div>
        )
    }

}

export default IsolationContactFrom; 