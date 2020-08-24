import React from 'react'; 
import StudentCard from './StudentCard'
import { Redirect } from 'react-router-dom'; 


class StudentsList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            students: [], 
            search: ""
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/students", {
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

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }

        const listToMap = this.state.students.filter(student => {
            let fullName = student.first_name + " " + student.last_name 
            return fullName.includes(this.state.search)
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
                        <label htmlFor="search">Search by Name</label>
                        <input type="text" className="form-control" name="search" placeholder="Search..." value={this.state.search} onChange={this.handleChange} />
                        {studentsList}
                    </div>
                </div>
            </div>
        )
    }
}

export default StudentsList; 