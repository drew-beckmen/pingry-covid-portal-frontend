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
            this.btn = <a href={`/people/${this.props.isolation.student_id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Person Details</a>
        }
        
        this.editBtn = ""
        this.deleteBtn = ""
        if (this.props.showButton) {
            this.editBtn = <button className="btn btn-warning active" onClick={() => this.setState({showEdit: !this.state.showEdit})} disabled={this.state.isolation.completed}>Edit Isolation</button>
            this.deleteBtn = <button className="btn btn-danger active" onClick={this.handleClick} disabled={this.state.isolation.completed}>Delete Isolation</button>
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
        if (name === "confirmed") {
            if (document.getElementById("confirmed").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        if (name === "potential") {
            if (document.getElementById("potential").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        let oldState = {...this.state.isolation}
        oldState[name] = value 
        this.setState({isolation: oldState})
    }

    handleClick = (e) => {
        this.props.destroy(this.state.isolation.id, "isolations")
        alert("Isolation deleted successfully")
    }

    //this isn't very DRY, but focus on refactor later.
    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/isolations/${this.state.isolation.id}`, {
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
        const hasStudentNameInfo = !!this.state.isolation.student;
        let first_name, last_name, veracross_id;
        if (hasStudentNameInfo) {
            first_name = this.state.isolation.student.first_name;
            last_name = this.state.isolation.student.last_name;
            veracross_id = this.state.isolation.student.veracross_id;
        }
        return (
            <div className="card">
                <div className="card-body">
                    {hasStudentNameInfo && <h3 className="card-title">{`${first_name} ${last_name} - ${veracross_id}`}</h3>}
                    <h5 className="card-title">Start Date: {this.state.isolation.start_isolation}</h5>
                    {this.state.isolation.potential && (
                        <div>
                            <h5 className="card-title">Potentially Positive: Individual may be released with negative PCR test within 48 hours of the Pingry test.</h5>
                            <p className="card-text">If the person receives positive individual test result, please convert to "Confirmed Positive". If the person receives negative PCR test, please leave the isolation as potentially positive and mark it as completed. You may want to describe the situation in notes.</p><br/>
                        </div>
                    )}
                    {!this.state.isolation.potential && (
                        <h5 className="card-title">{this.state.isolation.confirmed ? "Confirmed Positive" : "Presumed Positive"}</h5>
                    )}
                    <p className="card-text">Test Barcode: {this.state.isolation.barcode ? this.state.isolation.barcode : "No Barcode Added"}</p>
                    <p className="card-text">Is the person fever free?: {this.state.isolation.fever_free ? "Yes" : "No"}</p>
                    <p className="card-text">Earliest Possible End Date: {this.state.isolation.end_date}</p>
                    <p className="card-text">{this.state.isolation.completed ? "Isolation Completed" : "Isolation Incomplete"}</p>
                    <p className="card-text">Notes: {this.state.isolation.notes ? this.state.isolation.notes : "No Notes Added"}</p>
                    {this.btn || ""}
                    {this.editBtn || ""} {" | "}
                    {this.deleteBtn || "" }
                    {this.state.showEdit && <EditIsolation info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
                </div>
            </div>
        )
    }
}

export default IsolationShow; 