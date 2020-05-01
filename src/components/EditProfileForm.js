import React from "react";
import { Button, Form } from "semantic-ui-react";
import { connect } from 'react-redux'
import {updateUser} from '../actions'

class EditProfileForm extends React.Component {
  state = { password: "", body: "" };
  handleChange = (e) => {
    
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.props.userId)
    this.props.updateUser(this.state, this.props.userId)
    this.setState({password:"", body:""})
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
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
              name='body'
              value = {this.state.body}
              onChange={this.handleChange}
            ></textarea>
          </Form.Field>

          <Button type="submit">Submit</Button>
          {this.props.updateSuccess && <p>Update Successful!</p>}
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return ({
    updateSuccess: state.profile.updateUserSuccess,
    updateError:state.profile.updateUserError
  })
}
export default connect(mapStateToProps, {updateUser})(EditProfileForm)

