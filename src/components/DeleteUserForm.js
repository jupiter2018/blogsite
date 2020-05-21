import React from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteUser } from '../actions'
import {Link} from 'react-router-dom'
import "./EditProfileForm.css";

class DeleteUserForm extends React.Component {
  state = { password: "", body: "", clicked: false };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  
  handleDelete = (event) => {
    console.log(event.target.value)
    if (event.target.value === 'yes') {
      this.props.deleteUser(this.props.userId)
    }
  }
  render() {
    return (
      <div id="main">
        <div id="close">
          <button onClick={this.props.handleClose}>X</button>
        </div>
        <Form>
          <Form.Field>
            <label>Are you sure you want to delete your profile?</label>
          </Form.Field>

          <div className="delete">
            <Button value="yes" onClick={this.handleDelete}>Yes</Button>
          </div>
          <div>
            <Button value="no" onClick={this.props.handleClose}>
              No
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(null,{deleteUser})(DeleteUserForm)
