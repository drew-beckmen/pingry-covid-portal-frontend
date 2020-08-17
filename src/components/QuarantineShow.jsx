import React from 'react'; 


const QuarantineShow = (props) => {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Date of Exposure: {props.quarantine.exposure}</h5>
            </div>
        </div>
    )
}

export default QuarantineShow; 