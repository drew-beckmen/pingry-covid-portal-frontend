import React from 'react'; 

class NewQuarantineForm extends React.Component {
    state = {
        quarantine: {
            exposure: null, 
            student_id: this.props.studentId, 
            completed: false 
        }
    }

    handleChange = (e) => {

        let {name, value} = e.target
        if (name === "completed") {
            value = document.getElementById("completed").checked;
        }
        let oldState = {...this.state.quarantine}
        oldState[name] = value 
        this.setState({quarantine: oldState}, () => console.log(this.state.quarantine))
        console.log(this.state.quarantine)
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (window.confirm(`Do you really want to submit this quarantine ${localStorage.name}? The quarantine has the following day of exposure: ${this.state.quarantine.exposure}`)) {
            fetch("https://tracking-db.pingryanywhere.org/api/v1/quarantines", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `bearer ${localStorage.token}`
                }, 
                body: JSON.stringify({quarantine: this.state.quarantine})
            })
            .then(r => r.json())
            .then(resp => {
                if (resp.id) { 
                    this.props.addOneQuarantine(resp, "quarantines")
                }
                else {
                    alert("Not successfully added")
                }
            })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Date of Exposure:</label>
                    <input className="form-control" type="date" name="exposure" value={this.state.quarantine.exposure} onChange={this.handleChange}/>
                    <label>End Date:</label>
                    <input className="form-control" type="date" name="end_date" value={this.state.quarantine.end_date} onChange={this.handleChange}/>
                    <label>Is the student's quarantine resolved?:</label>
                    <input id="completed" className="form-control" type="checkbox" name="completed" defaultChecked={this.state.quarantine.completed} onChange={this.handleChange}/>
                    <label>Notes:</label>
                    <input className="form-control" type="text" name="notes" value={this.state.quarantine.notes} onChange={this.handleChange} /> 
                    <input className="form-control" type="submit" value="Submit"/>
                </div>
            </form>
        )
    }
}
export default NewQuarantineForm; 

