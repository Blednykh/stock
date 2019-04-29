import React from 'react';
import {Route, Link} from "react-router-dom";
import {connect} from "react-redux";
import {signup} from "../../actions/index";
import Loader from "react-loader-spinner";
import SignIn from '../signIn/SignIn';
import './SignUp.css'


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };

    }


    handleSubmit = () => this.props.signup(this.state);

    onUserNameChange = event => this.setState({login: event.target.value});

    onPasswordChange = event => this.setState({password: event.target.value});

    render() {
        const {accountInfoLoading} = this.props.userInfo;

        const displayForm = (accountInfoLoading === "inherit") ? "none" : "inherit";

        return (
            <div>
                <div className="signup-form" style={{display: displayForm}}>
                    <div className="form">
                        <h1>Sign Up</h1>
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="txtb"
                            onChange={this.onUserNameChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="txtb"
                            onChange={this.onPasswordChange}
                        />
                        <input
                            type="submit"
                            value="Create Account"
                            className="signup-btn"
                            onClick={this.handleSubmit}
                        />
                        <Link to="/SignIn">Sign In?</Link>
                        <Route path="/SignIn" component={SignIn}/>
                    </div>
                </div>
                <div className="loader" style={{display: accountInfoLoading}}>
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
            signup: (newUser) => dispatch(signup(newUser))
        }
    ))(SignUp);
