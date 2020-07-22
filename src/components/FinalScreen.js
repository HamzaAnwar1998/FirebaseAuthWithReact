import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import fire from '../config/Config'

export class FinalScreen extends Component {
    state = {
        userFirstname: '',
        userLastname: '',
        userEmail: '',
        userBio: ''
    }

    // logout method
    logout = () => {
        this.props.logout();
    }
    componentDidMount() {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                return fire.firestore().collection('users').doc(user.uid).get().then((snapshot) => {
                    // console.log(snapshot.data());
                    const userFirstname = snapshot.data().FirstName;
                    const userLastname = snapshot.data().lastName;
                    const Email = snapshot.data().Email;
                    const Bio = snapshot.data().Bio;
                    this.setState({
                        userFirstname,
                        userLastname,
                        userEmail: Email,
                        userBio: Bio
                    })
                })
            }
        })
    }
    render() {
        return (
            <MuiThemeProvider>
                <>
                    <AppBar title="thanks for joining us" />
                    <h2>Thankyou for completing registeration process</h2>
                    <p>Here you can place content only login users can see</p>
                    <div>Your credentials are as follows</div>
                    <span>First Name: {this.state.userFirstname}</span><br />
                    <span>Last Name: {this.state.userLastname}</span><br />
                    <span>Email: {this.state.userEmail}</span><br />
                    <span>Bio: {this.state.userBio}</span><br/>
                    <button className="btn btn-secondary" onClick={this.logout}>LOGOUT</button>
                </>
            </MuiThemeProvider>
        )
    }
}

export default FinalScreen
