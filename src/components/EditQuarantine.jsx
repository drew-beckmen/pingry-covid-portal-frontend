import React from 'react'; 

const EditQuarantine = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className="form-group">
                <label>Date of Exposure:</label>
                <input className="form-control" type="date" name="exposure" value={props.info.quarantine.exposure} onChange={props.handleChange}/>
                <label>End Date:</label>
                <input className="form-control" type="date" name="end_date" value={props.info.quarantine.end_date} onChange={props.handleChange}/>
                <label>Is the person's quarantine resolved?:</label>
                <input id="completed" className="form-control" type="checkbox" name="completed" defaultChecked={props.info.quarantine.completed} onChange={props.handleChange}/>
                <label>Notes:</label>
                <input className="form-control" type="text" name="notes" value={props.info.quarantine.notes} onChange={props.handleChange} /> 
                {(!props.info.quarantine.end_date && props.info.quarantine.completed) && <p>You must list an end date when marking as completed.</p>}
                <input className="form-control" type="submit" value="Submit" disabled={(!props.info.quarantine.end_date && props.info.quarantine.completed) } />
            </div>
        </form>
    )
}

export default EditQuarantine; 