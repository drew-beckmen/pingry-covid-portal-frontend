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
                <label>Is this a seven day quarantine?:</label>
                <input id="is_seven_day" className="form-control" type="checkbox" name="is_seven_day" defaultChecked={props.info.quarantine.is_seven_day} onChange={props.handleChange}/>
                <label>Notes:</label>
                <input className="form-control" type="text" name="notes" value={props.info.quarantine.notes} onChange={props.handleChange} /> 
                <input className="form-control" type="submit" value="Submit"/>
            </div>
        </form>
    )
}

export default EditQuarantine; 