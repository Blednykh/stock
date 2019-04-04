import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './SignIn.css';
import SignUp from "../signUp/SignUp";
import {connect} from "react-redux";
import {signin} from "../../actions/index";

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            login: '',
            password: ''
        };
        }


    handleSubmit = () => this.props.signin(this.state);
    onUserNameChange = event => this.setState({login: event.target.value});
    onPasswordChange = event => this.setState({password: event.target.value});

    render() {
        return (
            <div className="signin-form">
                <div className="form">
                    <h1>Sign In</h1>
                    <input type="text" placeholder="User Name" className="txtb" onChange={this.onUserNameChange}/>
                    <input type="password" placeholder="Password" className="txtb" onChange={this.onPasswordChange}/>
                    <input type="submit" value="Sign In" className="signin-btn" onClick={this.handleSubmit}/>
                    <Link to="/SignUp">Create an account?</Link>
                    <Route path="/SignUp" component={SignUp} />
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    (dispatch) => ({
    signin: (user) => dispatch(signin(user))
}
))(SignIn);

