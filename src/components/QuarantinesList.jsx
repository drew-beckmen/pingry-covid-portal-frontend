import React from 'react'; 
import QuarantineShow from './QuarantineShow'

class QuarantinesList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            quarantines: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/quarantines", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({quarantines: obj}))
    }

    render() {
        const quarantinesList = this.state.quarantines.map(quarantine => {
            return (
                <QuarantineShow key={quarantine.id} quarantine={quarantine} showDetails={true} /> 
            )
        })
        return (
            <div>
                <h1 style={{color: "darkblue"}}>{quarantinesList.length} Total People In Quarantine at Pingry</h1>
                {/* insert some date on overall stats here */}
                {quarantinesList}
            </div>
        )
    }
}

export default QuarantinesList; 