import React from 'react'; 
import { Switch, Route, withRouter } from 'react-router-dom'; 
import NavBar from './NavBar'; 
import LoginForm from './LoginForm'; 
import StudentsList from './StudentsList';
import ShowStudent from './ShowStudent'
import IsolationsList from './IsolationsList'
import QuarantineList from './QuarantinesList'
import EditStudent from './EditStudent'
import IsolationShow from './IsolationShow'
import Profile from './Profile'
import Home from './Home'; 

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
        // { debugger }
        // if (localStorage.token) {
        //     localStorage.removeItem("token")
        //     this.props.history.push("/")
        // }
        if(routerProps.location.pathname === "/login"){
            return <LoginForm formName="Login to Pingry COVID Portal" handleSubmit={this.handleLoginSubmit}/>
        }
    }

    handleLoginSubmit = (userInfo) => {
        fetch("https://tracking-db.pingryanywhere.org/api/v1/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({user: userInfo})
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                localStorage.setItem("user_id", data.user.id)
                localStorage.setItem("token", data.jwt)
                localStorage.setItem("name", data.user.username)
                this.setState({user: data.user, token: data.jwt}, () => {
                    this.props.history.push("/")
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
        let navbarProp = "Login"
        if (localStorage.token) {
            navbarProp = "Logout"
        }
        return (
            <div className="App">
                <NavBar action={navbarProp}/>
                <Switch>
                    <Route exact path="/login" render={ this.renderForm } />
                    <Route exact path="/people" render={this.renderStudents} />
                    <Route exact path="/people/:id" component={ShowStudent} />
                    <Route exact path="/people/:id/edit" component={EditStudent} />
                    <Route exact path="/isolations" component={IsolationsList} />
                    <Route path="/isolations/:id" component={IsolationShow} />
                    <Route path="/quarantines" component={QuarantineList} />
                    <Route exact path="/profile" component={Profile} />
                    <Route path="/" exact component={Home} />
                    <Route render={ () => <p>Page not Found</p> } />
                </Switch>
            </div>
        );
    }


}

export default withRouter(App); 