import React from "react";
import { Button, Form } from "semantic-ui-react";
import "./Register.css";
import { connect } from 'react-redux'
import { register } from '../actions'
import {Link} from 'react-router-dom'


class Register extends React.Component {
  state = { username: "", password: "", email: "", password2: "" };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.registerSuccess !== prevProps.registerSuccess) {
      
      this.props.history.push(`/`);
    }
  }

  handleRegister = (e) => {
    e.preventDefault();
    this.props.register(this.state);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const err = this.props.registerError;
    return (
      <div id="formHolder">
        <Form onSubmit={this.handleRegister}>
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
            <label>Email</label>
            <input
              placeholder="john@company.com"
              type="email"
              name="email"
              value={this.state.email}
              required
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="password"
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Confirm Password</label>
            <input
              placeholder="confirm password"
              type="password"
              name="password2"
              value={this.state.password2}
              required
              onChange={this.handleChange}
            />
          </Form.Field>
          {err && <p style={{ color: "red" }}>{err}</p>}
          <Button type="submit">Submit</Button>
        </Form>
        <h5>
          Join the blog:<Link to="/"> Login</Link>
        </h5>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return ({
    registerError: state.auth.registerError,
    registerSuccess: state.auth.registerSuccess,
  }
  )
}

export default connect(
  mapStateToProps,
  { register }
)(Register);
