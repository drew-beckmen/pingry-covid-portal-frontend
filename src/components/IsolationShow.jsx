import React from 'react'; 
import EditIsolation from './EditIsolation'; 

class IsolationShow extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            isolation: this.props.isolation, 
            showEdit: false
        }
    
        this.btn = "" 
        if (this.props.showDetails) {
            this.btn = <a href={`/students/${this.props.isolation.student_id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Student Details</a>
        }
        
        this.editBtn = ""
        if (this.props.showButton) {
            this.editBtn = <button className="btn btn-secondary active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Isolation</button>
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        if (name === "fever_free") {
            if (document.getElementById("fever").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        if (name === "completed") {
            if (document.getElementById("completed").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        let oldState = {...this.state.isolation}
        console.log(oldState)
        oldState[name] = value 
        this.setState({isolation: oldState})
    }

    //this isn't very DRY, but focus on refactor later.
    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/isolations/${this.state.isolation.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify(this.state.isolation)
        })
        .then(resp => resp.json())
        .then(this.setState({showEdit: false}))
    }



    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Start Date: {this.state.isolation.start_isolation}</h5>
                    <p className="card-text">Date Symptoms Began Improving: {this.state.isolation.date_improving || "Not Yet Improving"}</p>
                    <p className="card-text">Is the student fever free?: {this.state.isolation.fever_free ? "Yes" : "No"}</p>
                    <p className="card-text">Earliest Possible End Date: {this.state.isolation.end_date}</p>
                    <p className="card-text">{this.state.isolation.completed ? "Isolation Completed" : "Isolation Incomplete"}</p>
                    {this.btn || ""}
                    {this.editBtn || ""}
                    {this.state.showEdit && <EditIsolation info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
}

export default IsolationShow; 