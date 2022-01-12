import React from 'react'; 

function triggerDataExport() {
    if (window.confirm(`Are you sure you want to export data to CSV? The file will be sent to ${localStorage.name}@pingry.org`)) {
        fetch(`https://tracking-db.pingryanywhere.org/api/v1/data_export`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => {
            alert("CSV file sent successfully");
        })
        .catch(err => alert("Data not exported successfully."))
    }
}

const DataExport = () => {
    return (
        <button style={{"margin": "5px"}} className="btn btn-danger active" onClick={triggerDataExport}>Export Data to CSV</button>
    )
}
export default DataExport;
