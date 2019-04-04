import React from 'react';
import './SignUp.css'
import {BrowserRouter as Router,Route, Link, Redirect } from "react-router-dom";
import SignIn from '../signIn/SignIn';
import {connect} from "react-redux";
import {signup} from "../../actions/index";

class SignUp extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            login: '',
            password: ''
        };

    }


    handleSubmit = () => this.props.signup(this.state);
    onUserNameChange = event => this.setState({login: event.target.value});
    /*onEmailChange = event => this.setState({email: event.target.value});*/
    onPasswordChange = event => this.setState({password: event.target.value});

    render() {
       /* if(this.props.userInfo.accessToken!==undefined)
            return <Redirect push to="/" />;*/
        return (
            <div className="signup-form">
                <div className="form">
                    <h1>Sign Up</h1>
                    <input type="text" placeholder="Full Name" className="txtb" onChange={this.onUserNameChange}/>
                  {/*  <input type="email" placeholder="Email" className="txtb" onChange={this.onEmailChange}/>*/}
                    <input type="password" placeholder="Password" className="txtb" onChange={this.onPasswordChange}/>
                    <input type="submit" value="Create Account" className="signup-btn" onClick={this.handleSubmit}/>
                    <Link to="/SignIn">Sign In?</Link>
                    <Route path="/SignIn" component={SignIn} />
                </div>
            </div>
        )
    }

}

export default connect(
    null,
    (dispatch) => ({
            signup: (newUser) => dispatch(signup(newUser))
        }
    ))(SignUp);
