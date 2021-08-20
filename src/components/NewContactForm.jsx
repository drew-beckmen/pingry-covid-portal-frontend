import React from 'react'; 

class NewContactForm extends React.Component {
    state = {
        contact: {
            exposure: null, 
            student_id: this.props.studentId
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        let oldState = {...this.state.contact}
        oldState[name] = value 
        this.setState({contact: oldState}, () => console.log(this.state.contact))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (window.confirm(`Do you really want to submit this contact ${localStorage.name}? The contact has the following day of exposure: ${this.state.contact.exposure}`)) {
            fetch("https://tracking-db.pingryanywhere.org/api/v1/contacts", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json", 
                    "Authorization": `bearer ${localStorage.token}`
                }, 
                body: JSON.stringify({contact: this.state.contact})
            })
            .then(r => r.json())
            .then(resp => {
                if (resp.id) { 
                    this.props.addOneContact(resp, "contacts")
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
                    <input className="form-control" type="date" name="exposure" value={this.state.contact.exposure} onChange={this.handleChange}/>
                    <label>Notes:</label>
                    <input className="form-control" type="text" name="notes" value={this.state.contact.notes} onChange={this.handleChange} /> 
                    <input className="form-control" type="submit" value="Submit"/>
                </div>
            </form>
        )
    }
}
export default NewContactForm; 

