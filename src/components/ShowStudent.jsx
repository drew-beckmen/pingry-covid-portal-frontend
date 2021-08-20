import React from 'react'; 
import IsolationShow from './IsolationShow'
import QuarantineShow from './QuarantineShow'
import EditStudent from './EditStudent';
import NewIsolationForm from './NewIsolationForm';
import NewQuarantineForm from './NewQuarantineForm'
import IsolationContactForm from './IsolationContactForm';
import ContactShow from './ContactShow';
import NewContactForm from './NewContactForm';


class ShowStudent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            student: {}, 
            allOtherStudents: [], 
            showEdit: false, 
            showCreateQuarantine: false, 
            showCreateIsolation: false, 
            showContactForm: false,
            showCreateContact: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleStudentSubmit = this.handleStudentSubmit.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.addOneItem = this.addOneItem.bind(this)
    }

    handleDestroy = (id, key) => {
        let oldState = {...this.state.student}
        oldState[key] = oldState[key].filter(q => q.id !== id )
        this.setState({student: oldState})

        //Delete from the Database
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/${key}/${id}`, {
            method: "DELETE", 
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
    }

    handleChange = (e) => {
        let {name, value} = e.target
        let oldState = {...this.state.student}
        oldState[name] = value 
        this.setState({student: oldState})
    }

    handleStudentSubmit = (e) => {
        e.preventDefault()
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/students/${this.state.student.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify(this.state.student)
        })
        .then(resp => resp.json())
        .then(this.setState({showEdit: false}))
    }

    componentDidMount() {
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/students/${this.props.match.params.id}`, {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({student: obj}))
        
        // this is redundant, can you fix it later
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/studentinfo`, {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({allOtherStudents: obj}))
    }

    addOneItem(itm, key) {
        delete itm.student
        this.state.student[key].push(itm)

        // new addition for contacts where you are vaccinated and don't have to quarantine
        if (key === 'contacts') {
            this.setState({showCreateContact: false});
        } else if (key === "isolations") {
            this.setState({showCreateIsolation: false, showContactForm: true});
        } else {
            this.setState({showCreateQuarantine: false})
        }
    }

    //handle submit for forms on both isolations and quarantines

    getIsolations = () => this.state.student.isolations
    getQuarantines = () => this.state.student.quarantines
    getContacts = () => this.state.student.contacts


    postNewContacts = (objects, target) => {
        objects.forEach(obj => {
            fetch(`https://tracking-db.pingryanywhere.org/api/v1/${target}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify(obj)
            })
        })
    }

    //add contacts for a students isolation
    handleSubmit = (e, whatToPost, dateToPost, is_seven_day, is_vaccinated) => {
        e.preventDefault(); 
        let objectsToPost;
        let target;
        if (!is_vaccinated) {
            objectsToPost = whatToPost.map(c => {
                return (
                    {quarantine: {
                        exposure: dateToPost, 
                        converted_to_isolation: false, 
                        completed: false, 
                        student_id: c.value,
                        is_seven_day: is_seven_day,
                        notes: `This quarantine is linked to ${this.state.student.first_name} ${this.state.student.last_name}'s isolation. It was created because this person came into contact with  ${this.state.student.first_name} ${this.state.student.last_name}, a presumed or confirmed positive case of COVID-19`
                    }}
                )
            })
            target = 'quarantines';

        } else {
            objectsToPost = whatToPost.map(c => {
                return (
                    {contact: {
                        exposure: dateToPost, 
                        student_id: c.value,
                        notes: `This contact is linked to ${this.state.student.first_name} ${this.state.student.last_name}'s isolation. It was created because this person came into contact with  ${this.state.student.first_name} ${this.state.student.last_name}, a presumed or confirmed positive case of COVID-19. Since this individual is vaccinated, a quarantine is not required.`
                    }}
                )
            })
            target = 'contacts';
        }
        this.postNewContacts(objectsToPost, target);
        this.setState({showContactForm: false});
    }

    render() {
        if (this.state.student.id) {
            // debugger 
            const isolationsList = this.getIsolations().map(isolation =>
                <IsolationShow key={isolation.id} isolation={isolation} showButton={true} destroy={this.handleDestroy} />
            )

            const quarantinesList = this.getQuarantines().map(quarantine =>
                <QuarantineShow key={quarantine.id} quarantine={quarantine} showButton={true} destroy={this.handleDestroy}/>
            )


            const contactsList = this.getContacts().map(contact =>
                <ContactShow key={contact.id} contact={contact} showButton={true} destroy={this.handleDestroy}/>
            )

            return (
                <div>
                    <div key={this.state.student.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">Name: {this.state.student.first_name + " " + this.state.student.last_name}</h5>
                            {this.state.student.grade === 0 && <p className="card-text">{"Grade: Kindergarten"}</p>}
                            {this.state.student.grade === null && <p>Faculty or Staff Member</p>}
                            {this.state.student.grade > 0 && <p>Grade: {this.state.student.grade}</p>}
                            <p className="card-text">Campus: {this.state.student.campus}</p>
                            {this.state.student.cohort && <p className="card-text">Cohort: {this.state.student.cohort}</p>}
                            {" | "} <button className="btn btn-secondary active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Person</button> {" | "}
                            <button id="create-isolation" className="btn btn-secondary active" onClick={() => this.setState({showCreateIsolation: !this.state.showCreateIsolation})}>Create Isolation</button> {" | "}
                            <button className="btn btn-secondary active" onClick={() => this.setState({showCreateQuarantine: !this.state.showCreateQuarantine})}>Create Quarantine</button> {" | "}
                            <button className="btn btn-secondary active" onClick={() => this.setState({showCreateContact: !this.state.showCreateContact})}>Create Contact (No Quarantine Required)</button> {" | "}
                            <button className="btn btn-secondary active" onClick={() => this.setState({showContactForm: !this.state.showContactForm})} disabled={isolationsList.length === 0}>Bulk Add Contacts of Isolated Student</button> {" | "}
                            {this.state.showEdit && <EditStudent info={this.state} handleChange={this.handleChange} handleSubmit={this.handleStudentSubmit}/>}
                            {this.state.showCreateIsolation && <NewIsolationForm handleChange={this.handleChange} addOneIsolation={this.addOneItem} studentId={this.state.student.id}/>}
                            {this.state.showContactForm && <IsolationContactForm list={this.state.allOtherStudents} currentStudent={this.state.student.first_name + " " + this.state.student.last_name} handleSubmit={this.handleSubmit} />}
                            {this.state.showCreateQuarantine && <NewQuarantineForm handleChange={this.handleChange} addOneQuarantine={this.addOneItem} studentId={this.state.student.id}/>}
                            {this.state.showCreateContact && <NewContactForm handleChange={this.handleChange} addOneContact={this.addOneItem} studentId={this.state.student.id}/>}
                        </div>
                    </div>
                    <h3 style={{"textAlign": "center", color: "red"}}>Isolations</h3>
                    <div>{isolationsList}</div>
                    <h3 style={{"textAlign": "center", color: "red"}}>Quarantines</h3>
                    <div>{quarantinesList}</div>
                    <h3 style={{"textAlign": "center", color: "red"}}>Contacts</h3>
                    <div>{contactsList}</div>
                </div>

            )
        }
        else {
            return (
                <h1>Still Loading...</h1>
            )
        }
    }
}

export default ShowStudent; 