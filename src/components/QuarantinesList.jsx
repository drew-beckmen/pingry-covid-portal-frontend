import React from 'react'; 
import QuarantineShow from './QuarantineShow'
import { Redirect } from 'react-router-dom'; 


class QuarantinesList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            quarantines: [], 
            sortNewest: false, 
            showOnlyActive: false 
        }
    }

    componentDidMount() {
        fetch("https://tracking-db.pingryanywhere.org//api/v1/quarantines", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({quarantines: obj, sortNewest: false, showOnlyActive: false}))
    }

    handleChange = (e) => {
        const key = e.target.name 
        this.setState({[key]: !this.state[key]})
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }

        if (localStorage.write === "false") {
            return <Redirect to="/" />
        }

        let quarantinesList = this.state.quarantines; 
        if (this.state.sortNewest) {
            quarantinesList = [...this.state.quarantines].sort((a, b) => {
                let dateA = new Date(a.exposure)
                let dateB = new Date(b.exposure)
                return dateB-dateA
            })
        }

        if (this.state.showOnlyActive) {
            quarantinesList = quarantinesList.filter(q => !q.completed)
        }
        quarantinesList = quarantinesList.map(quarantine => {
            return (
                <QuarantineShow key={quarantine.id} quarantine={quarantine} showDetails={true} /> 
            )
        })

        const quarantinesConverted = [...this.state.quarantines].filter(q => q.converted_to_isolation).length 
        const numberActive = this.state.quarantines.reduce((acc, val) => {
            if (!val.completed) {
                return acc += 1
            } else {return acc + 0}
        }, 0)

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
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
                                        <th scope="row">Total Quarantines (Active + Completed)</th>
                                        <td>{this.state.quarantines.length - quarantinesConverted}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Active Quarantines</th>
                                        <td>{numberActive}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Quarantines Converted to Isolations</th>
                                        <td>{quarantinesConverted}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-check">
                                <input className="form-check-input" name="sortNewest" type="checkbox" onChange={this.handleChange}/>
                                <label className="form-check-label">Sort Newest to Oldest</label>
                                <br/>
                                <input className="form-check-input" name="showOnlyActive" type="checkbox" onChange={this.handleChange}/>
                                <label className="form-check-label">Show Only Active Quarantines</label>
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