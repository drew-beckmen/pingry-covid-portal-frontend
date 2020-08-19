import React from 'react'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import NavBar from './NavBar'; 
import LoginForm from './LoginForm'; 
import StudentsList from './StudentsList';
import ShowStudent from './ShowStudent'
import IsolationsList from './IsolationsList'
import QuarantineList from './QuarantinesList'
import EditStudent from './EditStudent'
import IsolationShow from './IsolationShow'
import Profile from './Profile'
// import Home from './components/Home'; 

class App extends React.Component {
    
    constructor() {
        super()
        this.state={
            user: {
                id: 0, 
                username: ""
            }, 
            token: ""
        }
    }
    

    renderForm = (routerProps) => {
        if(routerProps.location.pathname === "/login"){
            return <LoginForm formName="Login to Pingry COVID Portal" handleSubmit={this.handleLoginSubmit}/>
        }
    }

    handleLoginSubmit = (userInfo) => {
        fetch("http://localhost:3000/api/v1/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({user: userInfo})
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem("token", data.jwt)
                this.setState({user: data.user, token: data.jwt}, () => {
                    this.props.history.push("/students")
                })
            }
            else {
                alert("Incorrect username or password. Try again")
            }
        })
    }

    renderStudents = () => {
        return <StudentsList />
    }

    render(){
        return (
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route exact path="/login" render={ this.renderForm } />
                    <Route exact path="/students" render={this.renderStudents} />
                    <Route exact path="/students/:id" component={ShowStudent} />
                    <Route exact path="/students/:id/edit" component={EditStudent} />
                    <Route exact path="/isolations" component={IsolationsList} />
                    <Route path="/isolations/:id" component={IsolationShow} />
                    <Route path="/quarantines" component={QuarantineList} />
                    <Route exact path="/profile" render={() => <Profile {...this.state}/>} />
                    {/* <Route path="/" exact render={() => <Home /> } /> */}
                    <Route render={ () => <p>Page not Found</p> } />
                </Switch>
            </div>
        );
    }


}

export default withRouter(App); 