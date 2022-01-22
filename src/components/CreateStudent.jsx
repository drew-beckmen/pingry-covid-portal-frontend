import React from 'react'; 

const CreateStudent = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>First Name:</label>
                <input className="form-control" type="text" name="first_name" value={props.info.first_name} onChange={props.handleChange}/>
                <label>Last Name:</label>
                <input className="form-control" type="text" name="last_name" value={props.info.last_name} onChange={props.handleChange}/>
                <label>Is teacher?</label>
                <input id="teacher" className="form-control" type="checkbox" name="teacher" defaultChecked={props.info.teacher} onChange={props.handleChange}/>
                {!props.info.teacher &&  (<div>
                    <label>Grade (leave blank if teacher, 0-12 for student):</label>
                    <input className="form-control" type="text" name="grade" value={props.info.grade} onChange={props.handleChange}/>
                </div>)}
                <label>Campus ("Basking Ridge" or "Short Hills" only):</label>
                <input className="form-control" type="text" name="campus" value={props.info.campus} onChange={props.handleChange}/>
                <label>Email:</label>
                <input className="form-control" type="text" name="email" value={props.info.email} onChange={props.handleChange}/>
                {!props.info.teacher && (<div>
                    <label>Veracross ID (must fill if student):</label>
                    <input className="form-control" type="text" name="veracross_id" value={props.info.veracross_id} onChange={props.handleChange}/>
                </div>)}
                <input className="form-control" type="submit" value="Submit" disabled={props.validateInput()}/>
            </div>
        </form>
    )
}

export default CreateStudent; 