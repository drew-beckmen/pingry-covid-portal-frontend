import React from 'react'; 
import StudentCard from './StudentCard'

class StudentsList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            students: []
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

    render() {
        const studentsList = this.state.students.map(student => {
            return (
                <div>
                    <StudentCard key={student.id} student={student} /> 
                    {/* <a href={`/students/${student.id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Details</a> */}
                </div>
            )
        })
        return (
            <div>{studentsList}</div>
        )
    }
}

export default StudentsList; 