import React from 'react'; 
import { Redirect } from 'react-router-dom'; 
import IsolationShow from './IsolationShow'

class IsolationsList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            isolations: [], 
            sortNewest: false, 
            showOnlyActive: false 
        }
    }

    componentDidMount() {
        fetch("https://tracking-db.pingryanywhere.org/api/v1/isolations", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({isolations: obj, sortNewest: false, showOnlyActive: false}))
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

        let isolationsList = this.state.isolations; 
        if (this.state.sortNewest) {
            isolationsList = [...this.state.isolations].sort((a, b) => {
                let dateA = new Date(a.start_isolation)
                let dateB = new Date(b.start_isolation)
                return dateB-dateA
            })
        }
        if (this.state.showOnlyActive) {
            isolationsList = isolationsList.filter(q => !q.completed)
        }
        isolationsList = isolationsList.map(isolation => {
            return (
                <IsolationShow key={isolation.id} isolation={isolation} showDetails={true}  /> 
            )
        })
        const numberActive = this.state.isolations.reduce((acc, val) => {
            if (!val.completed) { return acc += 1 }
            else { return acc += 0}
        }, 0)
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Isolation Stats At Pingry</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Stat</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Total Isolations (Active + Completed)</th>
                                        <td>{this.state.isolations.length}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Active Isolations</th>
                                        <td>{numberActive}</td>
                                    </tr>
                                </tbody>
                            </table>
                        <div className="form-check">
                        <input className="form-check-input" name="sortNewest" type="checkbox" onChange={this.handleChange}/>
                                <label className="form-check-label">Sort Newest to Oldest</label>
                                <br/>
                                <input className="form-check-input" name="showOnlyActive" type="checkbox" onChange={this.handleChange}/>
                                <label className="form-check-label">Show Only Active Isolations</label>
                        </div>
                        <hr/>
                        {isolationsList}
                    </div>
                </div>
            </div>
        )
    }
}

export default IsolationsList; 