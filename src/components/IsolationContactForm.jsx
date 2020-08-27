import React from 'react'; 
import Select from 'react-select'; 

class IsolationContactFrom extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            contacts: []
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
        this.setState({contacts: val}) 
    }

    handleSubmit = (e) => {
        this.props.handleSubmit(e, this.state.contacts)
    }

    render() {
        return (
            <div>
                <br/>
                <hr/>
                <h5>Please enter {this.props.currentStudent}'s contacts.</h5>
                <h6>They will automatically be logged as new quarantines and notified via email.</h6>
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
                        <input className="form-control" type="submit" value="Submit" />
                    </div>
                </form>
                
            </div>
        )
    }

}

export default IsolationContactFrom; 