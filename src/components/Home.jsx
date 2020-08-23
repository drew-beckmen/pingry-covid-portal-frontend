import React from 'react'; 
import {Redirect} from 'react-router-dom'; 
class Home extends React.Component {


    constructor(props) {
        super(props); 
        this.state = {
            students: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/api/v1/students", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({students: obj}))
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }
        if (this.state.students.length === 0) {
            return (
                <h1>Still Loading...</h1>
            )
        }
        else {
            const shortHills = this.state.students.filter(student => student.campus === "Short Hills")
            const shortHillsIsolation = shortHills.reduce((acc, val) => acc + val.isolations.length, 0)
            const shortHillsQuarantine = shortHills.reduce((acc, val) => acc + val.quarantines.length, 0)
            const baskingRidge = this.state.students.filter(student => student.campus === "Basking Ridge")
            const baskingRidgeIsolation = baskingRidge.reduce((acc, val) => acc + val.isolations.length, 0)
            console.log(baskingRidge)
            const baskingRidgeActiveIsolation = baskingRidge.reduce((acc, val) => acc + (val.isolations.filter(i => !i.completed)).length, 0)
            const baskingRidgeQuarantine = baskingRidge.reduce((acc, val) => acc + val.quarantines.length, 0)

            return (
                <div>
                    <h1>COVID Metrics for Pingry Students</h1>
                    <h3>Total Number of Isolations at Basking Ridge: {baskingRidgeIsolation}</h3>
                    <h3>Total Number of Active Isolations at Basking Ridge: {baskingRidgeActiveIsolation}</h3>
                    <p>The active numbers can be inserted for all stats - just wanted to show one for demonstration purposes. Will add all relevant stats once i get to styling!</p>
                    <h3>Total Number of Isolations at Short Hills: {shortHillsIsolation}</h3>
                    <h3>Total Number of Quarantines at Basking Ridge: {baskingRidgeQuarantine}</h3>
                    <h3>Total Number of Quarantines at Short Hills: {shortHillsQuarantine}</h3>
                    <h3>Total Isolations: {shortHillsIsolation + baskingRidgeIsolation}</h3>
                    <h3>Total Quarantines: {shortHillsQuarantine + baskingRidgeQuarantine}</h3>
                    <h3>% Basking Ridge in Quarantine or Isolation: {(baskingRidgeIsolation + baskingRidgeQuarantine)/baskingRidge.length * 100}%</h3>
                    <h3>% Short Hills in Quarantine or Isolation: {((shortHillsIsolation + shortHillsQuarantine)/shortHills.length * 100).toFixed(1)}%</h3>
                    <h3>% Pingry in Quarantine or Isolation: {((shortHillsIsolation + shortHillsQuarantine + baskingRidgeIsolation + baskingRidgeQuarantine)/this.state.students.length * 100).toFixed(1)}%</h3>
                </div>
            )
        }
        
    }
}

export default Home; 