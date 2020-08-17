import React from 'react'; 


const StudentCard = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Name: {props.student.first_name + " " + props.student.last_name}</h5>
                <p className="card-text">Grade: {props.student.grade}</p>
                <a href={`/students/${props.student.id}`} className="btn btn-secondary active" role="button" aria-pressed="true">See Details</a>
            </div>
        </div>
    )
}

export default StudentCard; 