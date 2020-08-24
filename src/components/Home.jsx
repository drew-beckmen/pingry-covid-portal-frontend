import React from 'react'; 
import {Redirect} from 'react-router-dom'; 
import { BarChart, Legend, Bar, XAxis, YAxis } from 'recharts'; 
class Home extends React.Component {


    constructor(props) {
        super(props); 
        this.state = {
            dataToDisplay: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/summarystats", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({dataToDisplay: obj}))
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }
        
        if (this.state.dataToDisplay.length === 0) {
            return (
                <h1>Still Loading...</h1>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                                <h2><img src="https://static.thenounproject.com/png/3391554-200.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> Internal Pingry COVID-19 Stats:</h2>
                                <hr/>
                                <p>The data below represents the current state of coronavirus within the Pingry community. Data in the table is split according to campus. The graph to the right shows the number of students expected to be out of school due to COVID on any given day in the next 5 days (ignore weekends).</p>
                                <p>Statistics listed include total isolations and quarantines at both campuses as well as active isolations and quarantines at both campuses. The number of new quarantines and isolations within the last 72 hours is also included. </p>
                                
                        </div>
                        <div className="col">
                        <h2><img src="https://image.flaticon.com/icons/png/512/121/121731.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> Students Out Due to COVID:</h2>
                        < hr/>
                        <BarChart 
                        width={500}
                        height={300}
                        data={this.state.dataToDisplay.outOfSchoolHash}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5
                        }}>
                            <XAxis dataKey="name"/>
                            <YAxis />
                            <Legend />
                            <Bar dataKey="students" fill="#8884d8" />
                        </BarChart>
                        </div>
                    </div>
                    <br/>
                    <h3><img src="https://static.thenounproject.com/png/1853608-200.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/>Data By Campus:</h3>
                    <table className="table">
                                <thead>
                                    <th scope="col">Metric</th>
                                    <th scope="col">Short Hills</th>
                                    <th scope="col">Basking Ridge</th>
                                    <th scope="col">Overall</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">% Active Isolation or Quarantine</th>
                                        <td>{this.state.dataToDisplay.percentShortHillsActiveIsolationOrQuarantine}</td>
                                        <td>{this.state.dataToDisplay.percentBaskingRidgeActiveIsolationOrQuarantine}</td>
                                        <td>{this.state.dataToDisplay.percentPingryActiveIsolationOrQuarantine}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">New Quarantines in Last 72 Hours</th>
                                        <td>{this.state.dataToDisplay.past72QuarantinesShortHills}</td>
                                        <td>{this.state.dataToDisplay.past72QuarantinesBaskingRidge}</td>
                                        <td>{this.state.dataToDisplay.past72QuarantinesShortHills + this.state.dataToDisplay.past72QuarantinesBaskingRidge}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">New Isolations in Last 72 Hours</th>
                                        <td>{this.state.dataToDisplay.past72IsolationsShortHills}</td>
                                        <td>{this.state.dataToDisplay.past72IsolationsBaskingRidge}</td>
                                        <td>{this.state.dataToDisplay.past72IsolationsShortHills + this.state.dataToDisplay.past72IsolationsBaskingRidge}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Number of Active Isolations</th>
                                        <td>{this.state.dataToDisplay.totalActiveIsolationsShortHills}</td>
                                        <td>{this.state.dataToDisplay.totalActiveIsolationsBaskingRidge}</td>
                                        <td>{this.state.dataToDisplay.totalActiveIsolationsShortHills + this.state.dataToDisplay.totalActiveIsolationsBaskingRidge}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Number of Active Quarantines</th>
                                        <td>{this.state.dataToDisplay.totalActiveQuarantinesShortHills}</td>
                                        <td>{this.state.dataToDisplay.totalActiveQuarantinesBaskingRidge}</td>
                                        <td>{this.state.dataToDisplay.totalActiveQuarantinesShortHills + this.state.dataToDisplay.totalActiveQuarantinesBaskingRidge}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Quarantines</th>
                                        <td>{this.state.dataToDisplay.totalQuarantinesShortHills}</td>
                                        <td>{this.state.dataToDisplay.totalQuarantinesBaskingRidge}</td>
                                        <td>{this.state.dataToDisplay.totalQuarantinesShortHills + this.state.dataToDisplay.totalQuarantinesBaskingRidge}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Isolations</th>
                                        <td>{this.state.dataToDisplay.totalIsolationsShortHills}</td>
                                        <td>{this.state.dataToDisplay.totalIsolationsBaskingRidge}</td>
                                        <td>{this.state.dataToDisplay.totalIsolationsShortHills + this.state.dataToDisplay.totalIsolationsBaskingRidge}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">Number of Students</th>
                                    <td>{this.state.dataToDisplay.studentsShortHills}</td>
                                    <td>{this.state.dataToDisplay.studentsBaskingRidge}</td>
                                    <td>{this.state.dataToDisplay.studentsShortHills + this.state.dataToDisplay.studentsBaskingRidge}</td>
                                    </tr>
                                </tbody>
                            </table>
                </div>
            )
        } 
    }
}

export default Home; 