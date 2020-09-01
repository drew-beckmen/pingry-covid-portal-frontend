import React from 'react'; 
import EditQuarantine from './EditQuarantine'

class QuarantineShow extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            quarantine: this.props.quarantine, 
            showEdit: false, 
            showDetails: this.props.showDetails || false, 
            showButton: this.props.showButton || false 
        }
        this.btn = ""
        if (this.state.showDetails) {
            this.btn = <a href={`/people/${this.props.quarantine.student_id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Person Details</a>
        }
        
        this.editBtn = ""
        this.deleteBtn = ""
        this.convertBtn = ""
        if (this.state.showButton) {
            this.editBtn = <button style={{"margin": "5px"}} className="btn btn-warning active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Quarantine</button>
            this.deleteBtn = <button style={{"margin": "5px"}} className="btn btn-danger active" onClick={this.handleClick}>Delete Quarantine</button>
            this.convertBtn = <button style={{"margin": "5px"}} className="btn btn-primary active" onClick={this.convertToIsolation}>Presumed or Confirmed Positive? Convert to Isolation</button>
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (this.props.quarantine.converted_to_isolation) {
            this.setState({showDetails: false, showButton: false})
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        if (name === "completed") {
            if (document.getElementById("completed").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        let oldState = {...this.state.quarantine}
        oldState[name] = value 
        this.setState({quarantine: oldState}, () => console.log(this.state.quarantine))
    }

    convertToIsolation = (e) => {
        let oldState = {...this.state.quarantine}
        oldState["converted_to_isolation"] = true 
        oldState["completed"] = true 
        this.setState({quarantine: oldState, showButton: false, showDetails: false}, () => {this.handleSubmit(e)})
        document.getElementById("create-isolation").click()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        alert("Please enter the relevant information for the isolation")
    }

    handleClick = () => {
        //remove from the DOM using parent function in this.props.destroy
        this.props.destroy(this.state.quarantine.id, "quarantines")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/quarantines/${this.state.quarantine.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify(this.state.quarantine)
        })
        .then(resp => resp.json())
        .then(this.setState({showEdit: false}))
    }


    
    render() {
        const afterTwoWeeks = new Date(Date.parse(this.state.quarantine.exposure) + 12096e5)
        const endDateToDisplay = `${afterTwoWeeks.getMonth() + 1}/${afterTwoWeeks.getDate()}/${afterTwoWeeks.getFullYear()}`
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Date of Exposure: {this.state.quarantine.exposure}</h5>
                    <p className="card-text">{this.state.quarantine.completed ? "Quarantine Completed" : "Quarantine Incomplete"}</p>
                    <p className="card-text">Notes: {this.state.quarantine.notes ? this.state.quarantine.notes : "No Notes Added"}</p>
                    <p className="card-text">Final Day of Quarantine if No Conversion to Isolation: {endDateToDisplay}</p>
                    <p className="card-text">{this.state.quarantine.converted_to_isolation ? "CONVERTED TO ISOLATION" : ""}</p>
                    { this.state.showDetails && this.btn }
                    { this.state.showButton && this.editBtn}
                    { this.state.showButton && this.deleteBtn}
                    { this.state.showButton && this.convertBtn }
                    {this.state.showEdit && <EditQuarantine info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
    
}

export default QuarantineShow; 