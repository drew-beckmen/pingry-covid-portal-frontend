import React from 'react'; 

class Profile extends React.Component {
    state = {
        showEdit: false, 
        user: this.props.user, 
        token: this.props.token 
    }

    render() {
        console.log(this.props)
        return (
            <div> 
                <h1>Welcome, {this.props.user.username}!</h1>
                <h3>Please click the button below to change your password: </h3>
                <button className="btn btn-secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Change Password</button>
                {/* {this.state.showEdit && <ChangePassword info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>} */}
            </div>
        )
    }


}

export default Profile; 