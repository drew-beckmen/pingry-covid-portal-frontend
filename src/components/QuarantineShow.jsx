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
        if (this.props.showButton) {
            this.editBtn = <button className="btn btn-secondary active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Quarantine</button>
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        { debugger }
        if (name === "completed") {
            if (document.getElementById("completed").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        let oldState = {...this.state.quarantine}
        console.log(oldState)
        oldState[name] = value 
        this.setState({quarantine: oldState})
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
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Date of Exposure: {this.props.quarantine.exposure}</h5>
                    <p className="card-text">{this.state.quarantine.completed ? "Quarantine Completed" : "Quarantine Incomplete"}</p>
                    { this.btn || "" }
                    {this.editBtn || ""}
                    {this.state.showEdit && <EditQuarantine info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
    
}

export default QuarantineShow; 