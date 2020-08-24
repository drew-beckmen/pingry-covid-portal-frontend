import React from 'react'; 
import IsolationShow from './IsolationShow'
import QuarantineShow from './QuarantineShow'
import EditStudent from './EditStudent';
import NewIsolationForm from './NewIsolationForm';
import NewQuarantineForm from './NewQuarantineForm'


class ShowStudent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            student: {}, 
            showEdit: false, 
            showCreateQuarantine: false, 
            showCreateIsolation: false 
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.addOneItem = this.addOneItem.bind(this)
    }

    handleDestroy = (id, key) => {
        let oldState = {...this.state.student}
        oldState[key] = oldState[key].filter(q => q.id !== id )
        this.setState({student: oldState})

        //Delete from the Database
        fetch(`http://localhost:3000/api/v1/${key}/${id}`, {
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

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/students/${this.state.student.id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify(this.state)
        })
        .then(resp => resp.json())
        .then(this.setState({showEdit: false}))
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/students/${this.props.match.params.id}`, {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({student: obj}))
    }

    addOneItem(itm, key) {
        delete itm.student
        this.state.student[key].push(itm)
        key === "isolations" ? this.setState({showCreateIsolation: false}) : this.setState({showCreateQuarantine: false})
    }

    //handle submit for forms on both isolations and quarantines

    getIsolations = () => this.state.student.isolations
    getQuarantines = () => this.state.student.quarantines


    render() {
        if (this.state.student.id) {

            const isolationsList = this.getIsolations().map(isolation =>
                <IsolationShow key={isolation.id} isolation={isolation} showButton={true} destroy={this.handleDestroy} />
            )

            const quarantinesList = this.getQuarantines().map(quarantine =>
                <QuarantineShow key={quarantine.id} quarantine={quarantine} showButton={true} destroy={this.handleDestroy}/>
            )

            return (
                <div>
                    <div key={this.state.student.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">Name: {this.state.student.first_name + " " + this.state.student.last_name}</h5>
                            {this.state.student.grade && <p className="card-text">{this.state.student.grade === 0 ? "Grade: Kindergarten" : `Grade: ${this.state.student.grade}`}</p>}
                            {this.state.student.grade === null && <p>Faculty or Staff Member</p>}
                            <p className="card-text">Campus: {this.state.student.campus}</p>
                            {this.state.student.cohort && <p className="card-text">Cohort: {this.state.student.cohort}</p>}
                            {" | "} <button className="btn btn-secondary active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Student</button> {" | "}
                            <button id="create-isolation" className="btn btn-secondary active" onClick={() => this.setState({showCreateIsolation: !this.state.showCreateIsolation})}>Create Isolation</button> {" | "}
                            <button className="btn btn-secondary active" onClick={() => this.setState({showCreateQuarantine: !this.state.showCreateQuarantine})}>Create Quarantine</button> {" | "}
                            {this.state.showEdit && <EditStudent info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
                            {this.state.showCreateIsolation && <NewIsolationForm handleChange={this.handleChange} addOneIsolation={this.addOneItem} studentId={this.state.student.id}/>}
                            {this.state.showCreateQuarantine && <NewQuarantineForm handleChange={this.handleChange} addOneQuarantine={this.addOneItem} studentId={this.state.student.id}/>}
                        </div>
                    </div>
                    <h3 style={{"textAlign": "center", color: "red"}}>Isolations</h3>
                    <div>{isolationsList}</div>
                    <h3 style={{"textAlign": "center", color: "red"}}>Quarantines</h3>
                    <div>{quarantinesList}</div>
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