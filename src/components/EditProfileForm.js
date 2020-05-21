import React from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateUser, updateUserPassword } from "../actions";
import "./EditProfileForm.css";

class EditProfileForm extends React.Component {
  state = { password: "", body: "", clicked: false };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.id)
    if (e.target.id === "editForm") {
      console.log('i am here')
      let passwordData = { password: this.state.password };
      let bioData = { body: this.state.body };
      this.props.updateUser(bioData, this.props.profileId);
      this.props.updateUserPassword(passwordData, this.props.userId);
      this.setState({ password: "", body: "" });
    }
  };
  handleCloseClick = (event) => {
    console.log("I am close now", event.target);
    this.props.handleClose(event);
  };
  render() {
    console.log(this.props);
    return (
      <div id="main">
        <div id="close">
          <button onClick={this.handleCloseClick}>X</button>
        </div>
        <Form id="editForm" onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Change Password</label>
            <input
              placeholder="Enter password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Add Bio</label>
            <textarea
              rows="4"
              cols="50"
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </Form.Field>

          <Button type="submit">Submit</Button>
          {this.props.updateSuccess && this.props.updateUserPasswordSuccess && (
            <p>Update Successful!</p>
          )}
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    updateSuccess: state.profile.updateUserSuccess,
    updateError: state.profile.updateUserError,
    updateUserPasswordSuccess: state.profile.updateUserPasswordSuccess,
    updateUserPasswordError: state.profile.updateUserPasswordError,
  };
};
export default connect(mapStateToProps, {
  updateUser,
  updateUserPassword,
  
})(EditProfileForm);
