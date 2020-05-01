import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./Register.css";
import { connect } from "react-redux";
import { login } from "../actions";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = { username: "", password: "" };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.authToken !== prevProps.authToken && this.props.authToken) {
      let {username}=this.props.authToken
      this.props.history.push(`/profile/${username}`);
    }
  }

  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const err = this.props.loginError;
    return (
      <div id="formHolder">
        <div id="header">
          <h2>Welcome to Blogsite</h2>
        </div>
        <Form onSubmit={this.handleLogin}>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Enter username"
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Enter password"
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleChange}
            />
          </Form.Field>
          {err && <p style={{ color: "red" }}>{err}</p>}
          <Button type="submit">Submit</Button>
        </Form>
        <h5>
          Don't have an account:<Link to="/register">Register</Link>
        </h5>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loginLoading:state.auth.loginLoading,
    loginError: state.auth.loginError,
    authToken:state.auth.authToken,
  };
};

export default connect(mapStateToProps, { login })(Login);
