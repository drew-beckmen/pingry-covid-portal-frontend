import React from 'react'; 
import IsolationShow from './IsolationShow'

class IsolationsList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            isolations: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/isolations", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({isolations: obj}))
    }

    render() {
        const isolationsList = this.state.isolations.map(isolation => {
            return (
                <IsolationShow key={isolation.id} isolation={isolation} showDetails={true}  /> 
            )
        })
        return (
            <div>
                <h1 style={{color: "darkblue"}}>{isolationsList.length} Total People In Isolation at Pingry</h1>
                {/* insert some date on overall stats here */}
                {isolationsList}
            </div>
        )
    }
}

export default IsolationsList; 