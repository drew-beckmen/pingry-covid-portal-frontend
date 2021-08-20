import React from 'react'; 

class ContactShow extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            contact: this.props.contact, 
            showDetails: this.props.showDetails || false, 
            showButton: this.props.showButton || false 
        }
        this.btn = ""
        if (this.state.showDetails) {
            this.btn = <a href={`/people/${this.props.contact.student_id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Person Details</a>
        }
        
        this.deleteBtn = ""
        if (this.state.showButton) {
            this.deleteBtn = <button style={{"margin": "5px"}} className="btn btn-danger active" onClick={this.handleClick}>Delete Contact</button>
        }
    }

    // componentDidMount() {
    //     if (this.props.quarantine.converted_to_isolation) {
    //         this.setState({showDetails: false, showButton: false})
    //     }
    // }

    handleClick = () => {
        //remove from the DOM using parent function in this.props.destroy
        if (window.confirm('Are you sure you want to delete this contact?')) {
            this.props.destroy(this.state.contact.id, "contacts")
        } else {
            console.log("not deleted")
        }
    }

    
    render() {
        const hasStudentNameInfo = !!this.state.contact.student;
        let first_name, last_name, veracross_id;
        if (hasStudentNameInfo) {
            first_name = this.state.contact.student.first_name;
            last_name = this.state.contact.student.last_name;
            veracross_id = this.state.contact.student.veracross_id;
        }
        return (
            <div className="card">
                <div className="card-body">
                    {hasStudentNameInfo && <h3 className="card-title">{`${first_name} ${last_name} - ${veracross_id}`}</h3>}
                    <h5 className="card-title">Date of Exposure: {this.state.contact.exposure}</h5>
                    <p className="card-text">Notes: {this.state.contact.notes ? this.state.contact.notes : "No Notes Added"}</p>
                    { this.state.showButton && this.deleteBtn}
                    { this.state.showDetails && this.btn }
                </div>
            </div>
        )
    }
    
}

export default ContactShow; 