import React from 'react'; 

class NewIsolationForm extends React.Component {
    state = {
        isolation: {
            student_id: this.props.studentId, 
            start_isolation: null, 
            date_improving: null, 
            fever_free: false, 
            end_date: null, 
            completed: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
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

    //can't take it in as props since state is separate from parent component
    handleChange = (e) => {
        let {name, value} = e.target 
        let oldState = {...this.state.isolation}
        oldState[name] = value 
        this.setState({isolation: oldState}, () => console.log(this.state.isolation))
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Start Date:</label>
                    <input className="form-control" type="date" name="start_isolation" value={this.state.isolation.start_isolation} onChange={this.handleChange}/>
                    <label>Date of Symptom Improvement:</label>
                    <input className="form-control" type="date" name="date_improving" value={this.state.isolation.date_improving} onChange={this.handleChange}/>
                    <label>Is the student fever free?:</label>
                    <input id="fever" className="form-control" type="checkbox" name="fever_free" defaultChecked={this.state.isolation.fever_free} onChange={this.handleChange}/>
                    <label>End Date:</label>
                    <input className="form-control" type="date" name="end_date" value={this.state.isolation.end_date} onChange={this.handleChange}/>
                    <label>Is the student's isolation resolved?:</label>
                    <input id="completed" className="form-control" type="checkbox" name="completed" defaultChecked={this.state.isolation.completed} onChange={this.handleChange}/>
                    <input className="form-control" type="submit" value="Submit"/>
                </div>
            </form>
        )
    }
}

export default NewIsolationForm; 