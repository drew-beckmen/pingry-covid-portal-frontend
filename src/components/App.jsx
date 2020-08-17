import React from 'react'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'; 
import NavBar from './NavBar'; 
import Form from './Form'; 


// import Home from './components/Home'; 

class App extends React.Component {
    state={
        user: {
            id: 0, 
            username: ""
        }
    }

    renderForm = (routerProps) => {
        if(routerProps.location.pathname === "/login"){
            return <Form formName="Login to Pingry COVID Portal" handleSubmit={this.handleLoginSubmit}/>
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
                this.setState({user: data.user}, () => {
                    this.props.history.push("/students")
                })
            }
            else {
                alert("Incorrect username or password. Try again")
            }
        })
    }

    render(){
        console.log(this.props, "APP PROPS");
        return (
            <div className="App">
                <NavBar/>
                <Switch>
                    <Route path="/login" render={ this.renderForm } />
                    {/* <Route path="/" exact render={() => <Home /> } /> */}
                    <Route render={ () => <p>Page not Found</p> } />
                </Switch>
            </div>
        );
    }


}

export default withRouter(App); 