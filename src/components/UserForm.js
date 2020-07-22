import React, { Component } from 'react'
import PersonalDetails from './PersonalDetails'
import AccountDetails from './AccountDetails'
import Confirmation from './Confirmation'
import Success from './Success'
import FinalScreen from './FinalScreen'
import fire from '../config/Config'

export class UserForm extends Component {
    // defining innitial state
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        bio: '',
        Email: '',
        Phone: '',
        Password: '',
        Error: '',
        LoginError: ''
    }

    // increasing step by 1
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    // decreasing step by 1
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    // Handle fields change
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };

    // creating user and submitting data to firebase
    submit = (firstName, lastName, bio, Email, Phone, Password) => {
        fire.auth().createUserWithEmailAndPassword(Email, Password).then((cred) => {
            return fire.firestore().collection('users').doc(cred.user.uid).set({
                FirstName: firstName,
                lastName: lastName,
                Bio: bio,
                Email: Email,
                Phone: Phone,
                Password: Password
            }).then(() => {
                const { step } = this.state;
                this.setState({
                    step: step + 1,
                    firstName: '',
                    lastName: '',
                    bio: '',
                    Email: '',
                    Phone: '',
                    Password: '',
                    Error: '',
                    LoginError: ''
                })
            })
        }).catch(err => {
            this.setState({
                Error: err.message
            })
        })
    }

    // logging users
    login = (Email, Password) => {
        const { step } = this.state;
        // console.log('login invoked');
        // console.log(Email);
        // console.log(Password);
        fire.auth().signInWithEmailAndPassword(Email, Password).then(() => {
            console.log('success');
            this.setState({
                step: step + 1,
                LoginError: ''
            })
        }).catch(err => {
            // console.log(err.message);
            this.setState({
                LoginError: err.message
            })
        })
    }

    // go to login on login button click in personal details component
    gotologin = () => {
        this.setState({
            step: 4
        })
    }

    // go to signup on signup button click in success component (login page)
    gotoSignUp = () => {
        this.setState({
            step: 1
        })
    }

    // logging user out
    logout = () => {
        fire.auth().signOut().then(() => {
            console.log('successfully logged out');
            this.setState({
                step: 1
            })
        });
    }

    render() {
        const { step } = this.state;
        const { firstName, lastName, bio, Email, Phone, Password, Error, LoginError } = this.state;
        const values = { firstName, lastName, bio, Email, Phone, Password, Error, LoginError }

        switch (step) {
            case 1:
                return (
                    <PersonalDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                        gotologin={this.gotologin}
                    />
                )
            case 2:
                return (
                    <AccountDetails
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values} />
                )

            case 3:
                return (
                    <Confirmation
                        prevStep={this.prevStep}
                        values={values}
                        submit={this.submit}
                    />
                )

            case 4:
                return <Success login={this.login} values={values} handleChange={this.handleChange} gotoSignUp={this.gotoSignUp} />

            case 5:
                return (
                    <FinalScreen logout={this.logout} />
                )
        }
    }
}

export default UserForm
