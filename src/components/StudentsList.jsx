import React from 'react'; 
import StudentCard from './StudentCard'
import { Redirect } from 'react-router-dom'; 


class StudentsList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            students: [], 
            search: "", 
            showTeachersOnly: false, 
            showStudentsOnly: false 
        }
    }

    componentDidMount() {
        fetch("https://tracking-db.pingryanywhere.org/api/v1/student_details", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({students: obj}))
    }
    
    handleChange = (e) => {
        let {name, value} = e.target 
        this.setState({[name]: value})
    }

    handleStudentChange = (e) => {
        this.setState({showStudentsOnly: !this.state.showStudentsOnly})
    }

    handleTeacherChange = (e) => {
        this.setState({showTeachersOnly: !this.state.showTeachersOnly})
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }
        if (localStorage.write === "false") {
            return <Redirect to="/" />
        }

        let listToMap; 
        if (this.state.showStudentsOnly) {
            listToMap = this.state.students.filter(student => !student.teacher)
        }
        else if (this.state.showTeachersOnly) {
            listToMap = this.state.students.filter(student => student.teacher)
        }
        else {
            listToMap = this.state.students
        }

        listToMap = listToMap.filter(student => {
            // let fullName = (student.first_name + " " + student.last_name).toLowerCase()
            let veracross_id = `${student.veracross_id}`
            return veracross_id.includes(this.state.search)
        })

        const studentsList = listToMap.map(student => {
            return (
                    <StudentCard key={student.id} student={student} /> 
            )
        })
        return (
            <div className="container"> 
                <div className="row">
                    <div className="col">
                        <label htmlFor="search">Search by Student or Adult Veracross ID:</label>
                        <input type="text" className="form-control" name="search" placeholder="Search..." value={this.state.search} onChange={this.handleChange} />
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" onChange={this.handleStudentChange} disabled={this.state.showTeachersOnly}/>
                            <label className="form-check-label">See Students Only</label>
                            <br/>
                            <input className="form-check-input" type="checkbox" onChange={this.handleTeacherChange} disabled={this.state.showStudentsOnly}/>
                            <label className="form-check-label">See Adults Only</label>
                        </div>
                        {studentsList}
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentsList; 