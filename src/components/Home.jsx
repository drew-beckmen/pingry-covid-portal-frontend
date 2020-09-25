import React from 'react'; 
import {Redirect} from 'react-router-dom'; 
import { BarChart, Legend, Bar, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts'; 
class Home extends React.Component {


    constructor(props) {
        super(props); 
        this.state = {
            dataToDisplay: [], 
            externalData: [], 
            percentagesBothCampus: [], 
            graphs: []
        }
    }

    componentDidMount() {
        fetch("https://tracking-db.pingryanywhere.org/api/v1/pingrystats", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({dataToDisplay: obj}))
        fetch("https://tracking-db.pingryanywhere.org/api/v1/percentages", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({percentagesBothCampus: obj}))
        fetch("https://tracking-db.pingryanywhere.org/api/v1/graphs", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({graphs: obj}))
        fetch("https://pingry-covid-metrics.herokuapp.com/summarystats")
        .then(res => res.json())
        .then(obj => this.setState({externalData: obj}))
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }
        
        if (this.state.dataToDisplay.length === 0 || this.state.externalData.length === 0 || this.state.percentagesBothCampus.length === 0 || this.state.graphs.length === 0) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4">Welcome to Pingry's Internal COVID Tracking App!</h1>
                    <p className="lead">This app will provide live stats on the spread of coronavirus within the Pingry community. It is also where you will log and update  any isolations or quarantines for Pingry community members.</p>
                    <p className="lead">Please wait while the main dashboard loads. It will appear shortly.</p>
                    <hr className="my-4" />
                    <p>Please contact <a href="mailto:drew.beckmen@yale.edu">Drew Beckmen</a> with questions or issues with the platform.</p>
                    <div className="text-center">
                        <img src="https://static1.squarespace.com/static/55130f2fe4b09ee1385732c1/t/59ca4ca7d7bdce066ff35dc2/1506430134033/Screen+Shot+2017-09-15+at+4.16.59+PM.png?format=1500w" className="rounded" alt="ground" />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                                <h2><img src="https://static.thenounproject.com/png/3391554-200.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> Internal Pingry COVID-19 Stats:</h2>
                                <hr/>
                                <p>The data below represents the current state of coronavirus within the Pingry community. Data in the table is split according to campus. The graph to the right shows the number of students expected to be out of school due to COVID-19 on any given day in the next 5 days (ignore weekends).</p>
                                <p>Statistics listed include total isolations and quarantines at both campuses as well as active isolations and quarantines at both campuses. The number of new quarantines and isolations within the last 72 hours is also included. Data is also split by cohort in the event Pingry enters density reduced mode. Please contact Drew Beckmen with concerns.</p>
                                
                        </div>
                        <div className="col">
                        <h2><img src="https://image.flaticon.com/icons/png/512/121/121731.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> People Out Due to COVID:</h2>
                        < hr/>
                        <BarChart 
                        width={575}
                        height={300}
                        barGap={0}
                        data={this.state.dataToDisplay.outOfSchoolHash}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5
                        }}>
                            <XAxis dataKey="name" interval={0}/>
                            <YAxis />
                            <Tooltip cursor={{fill: '#8fe8f2'}}/>
                            <Legend />
                            <Bar dataKey="students" fill="#8884d8" />
                            <Bar dataKey="adults" fill="#40eaed" />
                            <Bar dataKey="total" fill="#ba274e" />
                        </BarChart>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                                <h2><img src="https://image.flaticon.com/icons/png/512/121/121731.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> BR Quarantines and Isolations:</h2>
                                <hr/>
                                <em><p>Shows the number of people in quarantine and isolation in BR for the past 7 days and the next 7 days given current statistics.</p></em>
                                
                                <BarChart 
                                    width={1200}
                                    height={400}
                                    barGap={0}
                                    data={this.state.graphs.baskingRidge}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5
                                    }}>
                                        <XAxis dataKey="name" interval={1}/>
                                        <YAxis />
                                        <Tooltip cursor={{fill: '#8fe8f2'}}/>
                                        <Legend />
                                        <Bar dataKey="isolation" fill="#8884d8" />
                                        <Bar dataKey="quarantine" fill="#40eaed" />
                                        <Bar dataKey="total" fill="#ba274e" />
                                </BarChart>
                        </div>
                        <div className="col">
                                <h2><img src="https://image.flaticon.com/icons/png/512/121/121731.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> SH Quarantines and Isolations:</h2>
                                <hr/>
                                <em><p>Shows the number of people in quarantine and isolation in SH for the past 7 days and the next 7 days given current statistics.</p></em>
                                <BarChart 
                                    width={1200}
                                    height={400}
                                    barGap={0}
                                    data={this.state.graphs.shortHills}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5
                                    }}>
                                        <XAxis dataKey="name" interval={1}/>
                                        <YAxis />
                                        <Legend />
                                        <Tooltip cursor={{fill: '#8fe8f2'}}/>
                                        <Bar dataKey="isolation" fill="#8884d8" />
                                        <Bar dataKey="quarantine" fill="#40eaed" />
                                        <Bar dataKey="total" fill="#ba274e" />
                                </BarChart>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                                <h2><img src="https://image.flaticon.com/icons/png/512/121/121731.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> BR Percentage Quarantine and Isolation:</h2>
                                <hr/>
                                <em><p>Shows the percentage of people in quarantine and isolation in BR for the past 7 days and the next 7 days given current statistics.</p></em>
                                
                                <LineChart 
                                    width={1200}
                                    height={400}
                                    barGap={0}
                                    data={this.state.percentagesBothCampus.baskingRidgePercentage14Days}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5
                                    }}>
                                        <XAxis dataKey="name" interval={3}/>
                                        <YAxis />
                                        <Legend />
                                        <Tooltip cursor={{fill: '#8fe8f2'}}/>
                                        <Line type="monotone" dataKey="%qi" stroke="#8884d8" activeDot={{ r: 8 }}/>
                                </LineChart>
                        </div>
                        <div className="col">
                                <h2><img src="https://image.flaticon.com/icons/png/512/121/121731.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/> SH Percentage Quarantine and Isolation:</h2>
                                <hr/>
                                <em><p>Shows the percentage of people in quarantine and isolation in SH for the past 7 days and the next 7 days given current statistics.</p></em>
                                <LineChart 
                                    width={1200}
                                    height={400}
                                    barGap={0}
                                    data={this.state.percentagesBothCampus.shortHillsPercentage14Days}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5
                                    }}>
                                        <XAxis dataKey="name" interval={1}/>
                                        <YAxis />
                                        <Legend />
                                        <Tooltip cursor={{fill: '#8fe8f2'}}/>
                                        <Line type="monotone" dataKey="%qi" stroke="#8884d8" activeDot={{ r: 8 }}/>
                                </LineChart>
                        </div>
                    </div>
                    <br/>
                    <h3><img src="https://icons-for-free.com/iconfiles/png/512/bar+chart+currency+finance+report+statistics+icon-1320086011433421741.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/>Decision Matrix Statistics:</h3>
                    <h5><em>Please note that data in this section is pulled from Pingry's external facing <a href="http://dashboard.pingryanywhere.org" target="_blank" rel="noopener noreferrer">coronavirus dashboard</a>, which is only updated once per day at 8am. For real-time stats, see the tables below.</em></h5>
                    <div className="card-group">
                            <div className="card border-primary mb-3">
                            <div className="card-header">
                            Pingry Counties - Infection Rate in Local Counties
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.externalData[0].pingryCountiesInfectionRate.toFixed(2)}</h5>
                                <p className="card-subtitle">14 day average, weighted based on Pingry student distribution across NJ counties</p>
                            </div>
                            </div>
                            <div className="card border-primary mb-3">
                            <div className="card-header">
                            Pingry Counties - Case Rate Per 100,000
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.externalData[0].pingryCountiesCaseRate.toFixed(2)}</h5>
                                <p className="card-subtitle">7 day average, weighted based on Pingry student distribution across NJ counties</p>
                            </div>
                        </div>
                        <div className="card border-primary mb-3">
                            <div className="card-header">
                            % Campus in Isolation or Quarantine (Short Hills)
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.externalData[0].shortHills7DayIsolationQuarantine.toFixed(2)}</h5>
                                <p className="card-subtitle">7 day average, based on this database.</p>
                            </div>
                        </div>
                        <div className="card border-primary mb-3">
                            <div className="card-header">
                            % Campus in Isolation or Quarantine (Basking Ridge)
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.externalData[0].baskingRidge7DayIsolationQuarantine.toFixed(2)}</h5>
                                <p className="card-subtitle">7 day average, based on this database.</p>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <h3><img src="https://static.thenounproject.com/png/1853608-200.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/>Community Data:</h3>
                    <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Metric</th>
                                        <th scope="col">Short Hills</th>
                                        <th scope="col">Basking Ridge</th>
                                        <th scope="col">Overall</th>
                                    </tr>
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
                                    <th scope="row">Number of People</th>
                                    <td>{this.state.dataToDisplay.studentsShortHills}</td>
                                    <td>{this.state.dataToDisplay.studentsBaskingRidge}</td>
                                    <td>{this.state.dataToDisplay.studentsShortHills + this.state.dataToDisplay.studentsBaskingRidge}</td>
                                    </tr>
                                </tbody>
                            </table>
                    <h3><img src="https://image.flaticon.com/icons/png/512/32/32441.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/>Cohort Data:</h3>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Metric</th>
                                <th scope="col">SH #1</th>
                                <th scope="col">SH #2</th>
                                <th scope="col">BR #1</th>
                                <th scope="col">BR #2</th>
                                <th scope="col">Total #1</th>
                                <th scope="col">Total #2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Active Isolations</th>
                                <td>{this.state.dataToDisplay.cohort1ActiveIsolationsShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort2ActiveIsolationsShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort1ActiveIsolationsBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2ActiveIsolationsBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort1ActiveIsolationsShortHills + this.state.dataToDisplay.cohort1ActiveIsolationsBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2ActiveIsolationsShortHills + this.state.dataToDisplay.cohort2ActiveIsolationsBaskingRidge}</td>
                            </tr>
                            <tr>
                                <th scope="row">Active Quarantines</th>
                                <td>{this.state.dataToDisplay.cohort1ActiveQuarantinesShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort2ActiveQuarantinesShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort1ActiveQuarantinesBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2ActiveQuarantinesBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort1ActiveQuarantinesShortHills + this.state.dataToDisplay.cohort1ActiveQuarantinesBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2ActiveQuarantinesShortHills + this.state.dataToDisplay.cohort2ActiveQuarantinesBaskingRidge}</td>
                            </tr>
                            <tr>
                                <th scope="row">New Quarantines Last 72 Hours</th>
                                <td>{this.state.dataToDisplay.cohort1NewQuarantinesShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort2NewQuarantinesShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort1NewQuarantinesBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2NewQuarantinesBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort1NewQuarantinesShortHills + this.state.dataToDisplay.cohort1NewQuarantinesBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2NewQuarantinesShortHills + this.state.dataToDisplay.cohort2NewQuarantinesBaskingRidge}</td>
                            </tr>
                            <tr>
                                <th scope="row">New Isolations Last 72 Hours</th>
                                <td>{this.state.dataToDisplay.cohort1NewIsolationsShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort2NewIsolationsShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort1NewIsolationsBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2NewIsolationsBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort1NewIsolationsShortHills + this.state.dataToDisplay.cohort1NewIsolationsBaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2NewIsolationsShortHills + this.state.dataToDisplay.cohort2NewIsolationsBaskingRidge}</td>
                            </tr>
                            <tr>
                                <th scope="row">Number of Students</th>
                                <td>{this.state.dataToDisplay.cohort1ShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort2ShortHills}</td>
                                <td>{this.state.dataToDisplay.cohort1BaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2BaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort1ShortHills + this.state.dataToDisplay.cohort1BaskingRidge}</td>
                                <td>{this.state.dataToDisplay.cohort2ShortHills + this.state.dataToDisplay.cohort2BaskingRidge}</td>
                            </tr>
                        </tbody>
                    </table>
                            <h3><img src="https://static.thenounproject.com/png/1248170-200.png" alt="logo" className="img-thumbnail" style={{width: 50, height: 50}}/>Adults Only:</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Metric</th>
                                        <th scope="col">Short Hills</th>
                                        <th scope="col">Basking Ridge</th>
                                        <th scope="col">Overall</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Active Isolations</th>
                                        <td>{this.state.dataToDisplay.shortHillsAdultsActiveIsolations}</td>
                                        <td>{this.state.dataToDisplay.baskingRidgeAdultsActiveIsolations}</td>
                                        <td>{this.state.dataToDisplay.shortHillsAdultsActiveIsolations + this.state.dataToDisplay.baskingRidgeAdultsActiveIsolations}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Active Quarantines</th>
                                        <td>{this.state.dataToDisplay.shortHillsAdultsActiveQuarantines}</td>
                                        <td>{this.state.dataToDisplay.baskingRidgeAdultsActiveQuarantines}</td>
                                        <td>{this.state.dataToDisplay.shortHillsAdultsActiveQuarantines + this.state.dataToDisplay.baskingRidgeAdultsActiveQuarantines}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Number of Adults</th>
                                        <td>{this.state.dataToDisplay.shortHillsAdults}</td>
                                        <td>{this.state.dataToDisplay.baskingRidgeAdults}</td>
                                        <td>{this.state.dataToDisplay.shortHillsAdults + this.state.dataToDisplay.baskingRidgeAdults}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                            <img src="https://pingryanywhere.org/assets/img/logo.svg" style={{width: 300, height: 100, display: "inline-block", background: "navy"}}></img>
                            </div>
                </div>
            )
        } 
    }
}

export default Home; 