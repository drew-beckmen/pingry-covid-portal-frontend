import React from 'react'; 

const EditQuarantine = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Date of Exposure:</label>
                <input className="form-control" type="date" name="exposure" value={props.info.quarantine.exposure} onChange={props.handleChange}/>
                <label>Is the student's isolation resolved?:</label>
                <input id="completed" className="form-control" type="checkbox" name="completed" defaultChecked={props.info.quarantine.completed} onChange={props.handleChange}/>
                <input className="form-control" type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default EditQuarantine; 