import React from 'react'; 

const EditIsolation = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Start Date:</label>
                <input className="form-control" type="date" name="start_isolation" value={props.info.isolation.start_isolation} onChange={props.handleChange}/>
                <label>Date of Symptom Improvement:</label>
                <input className="form-control" type="date" name="date_improving" value={props.info.isolation.date_improving} onChange={props.handleChange}/>
                <label>Is the student fever free?:</label>
                <input id="fever" className="form-control" type="checkbox" name="fever_free" defaultChecked={props.info.isolation.fever_free} onChange={props.handleChange}/>
                <label>End Date:</label>
                <input className="form-control" type="text" name="end_date" value={props.info.isolation.end_date} onChange={props.handleChange}/>
                <label>Is the student's isolation resolved?:</label>
                <input id="completed" className="form-control" type="checkbox" name="completed" defaultChecked={props.info.isolation.completed} onChange={props.handleChange}/>
                <input className="form-control" type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default EditIsolation; 