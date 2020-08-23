import React from 'react'; 
import { Redirect } from 'react-router-dom';
import PasswordForm from './PasswordForm' 


class Profile extends React.Component {
    state = {
        showEdit: false, 
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        const newPword = e.target[0].value 
        fetch(`http://localhost:3000/api/v1/users/${localStorage.user_id}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json", 
                Authorization: `bearer ${localStorage.token}`
            }, 
            body: JSON.stringify({user: {password: newPword}})
        })
        .then(resp => resp.json())
        .then(obj => {
            alert(`Hi ${obj.username}, your password has been updated!`)
            this.setState({showEdit: false})
        })
    }

    render() {

        if (!localStorage.token) {
            return <Redirect to="/login" />
        }
        console.log(this.props)
        return (
            <div> 
                <h1>Welcome, {localStorage.name}!</h1>
                <h3>Please click the button below to change your password: </h3>
                <button className="btn btn-secondary" onClick={() => this.setState({showEdit: !this.state.showEdit})}>Change Password</button>
                { this.state.showEdit && <PasswordForm handleSubmit={this.handleSubmit} />}
                {/* {this.state.showEdit && <ChangePassword info={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>} */}
            </div>
        )
    }


}

export default Profile; 