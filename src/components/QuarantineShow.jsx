import React from 'react'; 
import EditQuarantine from './EditQuarantine'

class QuarantineShow extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            quarantine: this.props.quarantine, 
            showEdit: false
        }
        this.btn = ""
        if (this.props.showDetails) {
            this.btn = <a href={`/students/${this.props.quarantine.student_id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Student Details</a>
        }
        
        this.editBtn = ""
        this.deleteBtn = ""
        this.convertBtn = ""
        if (this.props.showButton) {
            this.editBtn = <button className="btn btn-warning active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Quarantine</button>
            this.deleteBtn = <button className="btn btn-danger active" onClick={this.handleClick}>Delete Quarantine</button>
            this.convertBtn = <button className="btn btn-primary active" onClick={this.convertToIsolation}>Presumed or Confirmed Positive? Convert to Isolation</button>
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        this.handleClick()
        document.getElementById("create-isolation").click()
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    handleClick = () => {
        //remove from the DOM using parent function in this.props.destroy
        this.props.destroy(this.state.quarantine.id, "quarantines")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/quarantines/${this.state.quarantine.id}`, {
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
                    { this.btn || "" }
                    {this.editBtn || ""}{" | "}
                    { this.deleteBtn || ""} {" | "}
                    { this.convertBtn }
                    {this.state.showEdit && <EditQuarantine info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
    
}

export default QuarantineShow; 