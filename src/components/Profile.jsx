import React from 'react'; 
import { Redirect } from 'react-router-dom';
import PasswordForm from './PasswordForm' 
import DataExport from './DataExport'
import CreateStudent from './CreateStudent'

const initialState = {              
    first_name: "",
    last_name: "",
    grade: "",
    campus: "",
    veracross_id: "",
    email: "",
    teacher: false
}
class Profile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            showEdit: false, 
            student: initialState
        }
        this.handleStudentCreate = this.handleStudentCreate.bind(this)
        this.validateInput = this.validateInput.bind(this)
    }
    

    handleSubmit = (e) => {
        e.preventDefault() 
        const newPword = e.target[0].value 
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/users/${localStorage.user_id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify({user: {password: newPword}})
        })
        .then(resp => resp.json())
        .then(obj => {
            alert(`Hi ${obj.username}, your password has been updated!`)
            this.setState({showEdit: false})
        })
    }

    handleStudentCreate = (e) => {
        e.preventDefault()
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/students`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify(this.state.student)
        })
        .then(resp => resp.json())
        .then(data => {
            alert("Created successfully!");
            this.setState({student: initialState});
        })
    }

    handleStudentChange = (e) => {
        let {name, value} = e.target
        if (name === "teacher") {
            if (document.getElementById("teacher").checked) {
                value = true 
            }
            else {
                value = false 
            }
        }
        let modifyState = {...this.state.student}
        modifyState[name] = value 
        this.setState({student: modifyState}, () => console.log(this.state.student))
    }

    validateInput() {
        if (!["Basking Ridge", "Short Hills"].includes(this.state.student.campus)) {
            return true;
        }
        if (this.state.student.teacher) {
            return this.state.student.grade !== "" || this.state.student.email === "";
        } else {
            return isNaN(this.state.student.grade) || this.state.student.veracross_id === "";
        }
    }

    render() {

        if (!localStorage.token) {
            return <Redirect to="/login" />
        }

        return (
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        <h1>Welcome, {localStorage.name}!</h1>
                        <h3>Please click the button below to change your password: </h3>
                        <button className="btn btn-secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Change Password</button>
                        { this.state.showEdit && <PasswordForm handleSubmit={this.handleSubmit} />}
                    </div>
                </div>
                <div className="row">
                    { localStorage.write === "true" && <div className="col">
                        <h3>Please click the button below to generate a CSV export of Covid-19 data</h3>
                        <div><DataExport /></div>
                    </div>}
                </div>
                <div className="row">
                    { localStorage.write === "true" && <div className="col">
                        <h3>Add a person to the database:</h3>
                        <div><CreateStudent info={this.state.student} handleChange={this.handleStudentChange} handleSubmit={this.handleStudentCreate} validateInput={this.validateInput}/></div>
                    </div>}
                </div>
            </div>
        )
    }


}

export default Profile; 