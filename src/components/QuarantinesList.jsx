import React, { useReducer } from 'react'; 
import QuarantineShow from './QuarantineShow'
import { Redirect } from 'react-router-dom'; 


class QuarantinesList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            quarantines: [], 
            sortNewest: false 
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

    handleChange = (e) => {
        this.setState({sortNewest: !this.state.sortNewest})
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }
        let quarantinesList = this.state.quarantines; 
        if (this.state.sortNewest) {
            quarantinesList = [...this.state.quarantines].sort((a, b) => {
                let dateA = new Date(a.exposure)
                let dateB = new Date(b.exposure)
                return dateB-dateA
            })
        }
        quarantinesList = quarantinesList.map(quarantine => {
            return (
                <QuarantineShow key={quarantine.id} quarantine={quarantine} showDetails={true} /> 
            )
        })
        const numberActive = this.state.quarantines.reduce((acc, val) => {
            console.log(acc)
            if (!val.completed) {
                return acc += 1
            }
            else {
                return acc += 0 
            }
        }, 0)
        return (
            <div className="container">
                <div className="row">
                    <div class="col">
                        <h3>Quarantine Stats At Pingry</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Stat</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Total Quarantines (with Historical Data)</th>
                                        <td>{quarantinesList.length}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Active Quarantines</th>
                                        <td>{numberActive}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" onChange={this.handleChange}/>
                                <label class="form-check-label">Sort Newest to Oldest</label>
                            </div>
                            <hr/>
                        <h3>All Quarantines At Pingry</h3>
                        {quarantinesList}
                    </div>
                </div>
            </div>
        )
    }
}

export default QuarantinesList; 