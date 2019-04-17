import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './SignIn.css';
import SignUp from "../signUp/SignUp";
import {connect} from "react-redux";
import {signin} from "../../actions/index";
import Loader from "react-loader-spinner";

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
        let displayForm = (this.props.userInfo.accountInfoLoading === "inherit")? "none": "inherit";
        return (
            <div>
                <div className="signin-form" style={{display: displayForm}}>
                    <div className="form">
                        <h1>Sign In</h1>
                        <input type="text" placeholder="User Name" className="txtb" onChange={this.onUserNameChange}/>
                        <input type="password" placeholder="Password" className="txtb" onChange={this.onPasswordChange}/>
                        <span className="errorText" style = {{display: this.props.userInfo.displayErrorPasswordText}}>
                        Pair login-password doesn't match!
                    </span>
                        <input type="submit" value="Sign In" className="signin-btn"  onClick={this.handleSubmit}/>
                        <Link to="/SignUp">Create an account?</Link>
                        <Route path="/SignUp" component={SignUp} />
                    </div>
                </div>
                <div className="signin-loader" style={{display: this.props.userInfo.accountInfoLoading}}>
                    <Loader
                        type="Grid"
                        color="#487eb0"
                        height="100"
                        width="100"
                    />
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        userInfo: state.userInfo
    }),
    (dispatch) => ({
    signin: (user) => dispatch(signin(user))
}
))(SignIn);

