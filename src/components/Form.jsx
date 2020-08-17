import React, { Component } from 'react';

class Form extends Component {

    state = {
        username: "",
        password: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
        [name]: value
        })
    }

    render() {
        let {formName} = this.props
        let {username, password} = this.state

        return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <h1>{formName}</h1>
                <label htmlFor="username">Username:</label>
                <input className="form-control" type="text" autoComplete="off" name="username" value={username} onChange={this.handleChange}/>
                <label htmlFor="password">Password:</label>
                <input className="form-control" type="password" autoComplete="off" name="password" value={password} onChange={this.handleChange}/>
                <input className="form-control" type="submit" value="Submit"/>
            </div>
        </form>
        );
    }

}

export default Form;