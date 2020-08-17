import React from 'react'; 


const IsolationShow = (props) => {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Start Date: {props.isolation.start_isolation}</h5>
                <p className="card-text">Date Symptoms Began Improving: {props.isolation.date_improving || "Not Yet Improving"}</p>
                <p className="card-text">Is the student fever free?: {props.isolation.fever_free ? "Yes" : "No"}</p>
                <p className="card-text">Earliest Possible End Date: {props.isolation.end_date}</p>
            </div>
        </div>
    )
}

export default IsolationShow; 