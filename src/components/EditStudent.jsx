import React from 'react'; 

const EditStudent = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <h3>Person Info:</h3>
                {/* <label>First Name:</label>
                <input className="form-control" type="text" name="first_name" value={props.info.student.first_name} onChange={props.handleChange}/>
                <label>Last Name:</label>
                <input className="form-control" type="text" name="last_name" value={props.info.student.last_name} onChange={props.handleChange}/> */}
                <label>Grade:</label>
                <input className="form-control" type="text" name="grade" value={props.info.student.grade} onChange={props.handleChange}/>
                <label>Campus:</label>
                <input className="form-control" type="text" name="campus" value={props.info.student.campus} onChange={props.handleChange}/>
                <label>Cohort:</label>
                <input className="form-control" type="text" name="cohort" value={props.info.student.cohort} onChange={props.handleChange}/>
                <input className="form-control" type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default EditStudent; 