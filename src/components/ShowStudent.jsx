import React from 'react'; 
import IsolationShow from './IsolationShow'
import QuarantineShow from './QuarantineShow'
import EditStudent from './EditStudent';


class ShowStudent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            student: {}, 
            showEdit: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    //handle submit for forms on both isolations and quarantines

    getIsolations = () => this.state.student.isolations
    getQuarantines = () => this.state.student.quarantines


    render() {

        if (this.state.student.id) {

            const isolationsList = this.getIsolations().map(isolation =>
                <IsolationShow key={isolation.id} isolation={isolation} showButton={true} />
            )

            const quarantinesList = this.getQuarantines().map(quarantine =>
                <QuarantineShow key={quarantine.id} quarantine={quarantine} showButton={true} />
            )

            return (
                <div>
                    <div key={this.state.student.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">Name: {this.state.student.first_name + " " + this.state.student.last_name}</h5>
                            <p className="card-text">Grade: {this.state.student.grade}</p>
                            <p className="card-text">Campus: {this.state.student.campus}</p>
                            <button className="btn btn-secondary active" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Edit Student</button>
                            {this.state.showEdit && <EditStudent info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>}
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