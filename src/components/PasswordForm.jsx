import React from 'react'; 

class PasswordForm extends React.Component {

    state = {
        password: ""
    }

    handleChange = (e) => {
        let {name, value} = e.target 
        this.setState({[name]: value})
    }

    render() { 
        return (
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-group">
                    <label>Enter your new password:</label>
                    <input className="form-control" type="password" autoComplete="off" name="password" value={this.state.password} onChange={this.handleChange} />
                    <input className="form-control" type="submit" value="Submit"/>
                </div>
            </form>
        )
    }
}

export default PasswordForm; 