import React from 'react'; 
import ContactShow from './ContactShow'
import { Redirect } from 'react-router-dom'; 


class ContactList extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            contacts: [], 
            sortNewest: false
        }
    }

    componentDidMount() {
        fetch("https://tracking-db.pingryanywhere.org/api/v1/contacts", {
            headers: {
                "Authorization": `bearer ${localStorage.token}`
            }
        })
        .then(resp => resp.json())
        .then(obj => this.setState({contacts: obj, sortNewest: false}))
    }

    handleChange = (e) => {
        const key = e.target.name 
        this.setState({[key]: !this.state[key]})
    }

    render() {
        if (!localStorage.token) {
            return <Redirect to="/login" />
        }

        if (localStorage.write === "false") {
            return <Redirect to="/" />
        }

        let contactsList = this.state.contacts; 
        if (this.state.sortNewest) {
            contactsList = [...this.state.contacts].sort((a, b) => {
                let dateA = new Date(a.exposure)
                let dateB = new Date(b.exposure)
                return dateB-dateA
            })
        }

        contactsList = contactsList.map(contact => {
            return (
                <ContactShow key={contact.id} contact={contact} showDetails={true} /> 
            )
        })
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h3>Contact Stats At Pingry</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Stat</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Total Contacts</th>
                                        <td>{this.state.contacts.length}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="form-check">
                                <input className="form-check-input" name="sortNewest" type="checkbox" onChange={this.handleChange}/>
                                <label className="form-check-label">Sort Newest to Oldest</label>
                                <br/>
                            </div>
                            <hr/>
                        <h3>All Contacts At Pingry</h3>
                        {contactsList}
                    </div>
                </div>
            </div>
        )
    }
}

export default ContactList; 