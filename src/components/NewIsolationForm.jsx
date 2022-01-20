import React from 'react'; 

class NewIsolationForm extends React.Component {
    state = {
        isolation: {
            student_id: this.props.studentId, 
            start_isolation: null, 
            fever_free: false, 
            end_date: null, 
            completed: false,
            notes: "", 
            confirmed: false, 
            potential: false  
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (window.confirm(`Do you really want to submit this isolation ${localStorage.name}? The isolation has the following start date: ${this.state.isolation.start_isolation} `)) {
            fetch("https://tracking-db.pingryanywhere.org/api/v1/isolations", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `bearer ${localStorage.token}`
                }, 
                body: JSON.stringify({isolation: this.state.isolation})
            })
            .then(r => r.json())
            .then(resp => {
                if (resp.id) { 
                    this.props.addOneIsolation(resp, "isolations")
                }
                else {
                    alert("Not successfully added")
                }
            })
        }
    }

    //can't take it in as props since state is separate from parent component
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
        this.setState({isolation: oldState}, () => console.log(this.state.isolation))
    }
    
    render() {
        let {start_isolation, confirmed, potential, barcode} = this.state.isolation;
        barcode = barcode ? barcode : ""
        const validToSubmit = start_isolation && ((confirmed !== potential && ((confirmed && barcode.length === 0) || (potential && barcode.length >= 10))) || !(confirmed || potential))
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Start Date*:</label>
                    <input className="form-control" type="date" name="start_isolation" value={this.state.isolation.start_isolation} onChange={this.handleChange}/>
                    <label>Is this a confirmed positive case?:</label>
                    <input id="confirmed" className="form-control" type="checkbox" name="confirmed" defaultChecked={this.state.isolation.confirmed} onChange={this.handleChange} disabled={this.state.isolation.potential}/>
                    <label>Is this a potentially positive case? Only for students who test positive through Pingry's pool testing:</label>
                    <input id="potential" className="form-control" type="checkbox" name="potential" defaultChecked={this.state.isolation.potential} onChange={this.handleChange} disabled={this.state.isolation.confirmed}/>
                    {this.state.isolation.potential && (
                        <div>
                            <label>Please enter the vial barcode number*:</label>
                            <input id="barcode" className="form-control" type="text" name="barcode" value={this.state.isolation.barcode} onChange={this.handleChange} />    
                        </div>
                    )}
                    <label>Is the student fever free?:</label>
                    <input id="fever" className="form-control" type="checkbox" name="fever_free" defaultChecked={this.state.isolation.fever_free} onChange={this.handleChange}/>
                    <label>End Date (default is +10 days):</label>
                    <input className="form-control" type="date" name="end_date" value={this.state.isolation.end_date} onChange={this.handleChange}/>
                    <label>Is the student's isolation resolved?:</label>
                    <input id="completed" className="form-control" type="checkbox" name="completed" defaultChecked={this.state.isolation.completed} onChange={this.handleChange} disabled/>
                    <label>Additional notes:</label>
                    <input className="form-control" type="text" name="notes" value={this.state.isolation.notes} onChange={this.handleChange}/>
                    {!validToSubmit && <p style={{color: "red"}}>You have not filled out the neccessary fields. You must include the start date and the barcode ID if potentially positive.</p>}
                    <input className="form-control" type="submit" value="Submit" disabled={!validToSubmit} />
                </div>
            </form>
        )
    }
}

export default NewIsolationForm; 