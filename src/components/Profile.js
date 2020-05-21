import React from "react";
import Menu from "./Menu";
import ProfileCard from "./ProfileCard";
import EditProfileForm  from "./EditProfileForm";
import { Button } from "semantic-ui-react";
import "./Profile.css";
import { connect } from 'react-redux'
import { getUserInfo, getOwnData } from '../actions'
import DeleteUserForm from './DeleteUserForm'
class Profile extends React.Component {
  state = {
    myEditClass: "hide",
    myDeleteClass: "hide",
    id: "",
    bio: "No bio available",
    buttonStatus: true,
  };
  handleEdit = (event) => {
    this.setState({ myEditClass: "profile", buttonStatus: false });
  };
  handleDelete = (event) => {
    this.setState({ myDeleteClass: "profile", buttonStatus: false });
  };
  handleClose = (event) => {
    console.log("I am close now");
    // this.props.closeClick()
    this.setState({
      buttonStatus: true,
      myEditClass: "hide",
      myDeleteClass: "hide",
    });
  };
  componentDidMount() {
    console.log(this.props.authToken);
    this.props.getUserInfo();
  }
  componentDidUpdate(prevProps) {
    let userData = [];
    if (this.props.users.length > 0) {
      userData = this.getCurrentUserInfo(this.props.users);
      if (this.props.users !== prevProps.users) {
        this.setState({ bio: userData[0].body });
      }
    }

    if (this.props.updateUserSuccess !== prevProps.updateUserSuccess) {
      console.log(this.props.updateUserSuccess);
      this.setState({ bio: this.props.updateUserSuccess.body });
    }
    if (this.props.openForm !== prevProps.openForm) {
      this.setState({ myClass: "hide" });
    }
  }

  getCurrentUserInfo = (userInfo) => {
    let curUserData = userInfo.filter(
      (user) => user.username === this.props.authToken.username
    );
    return curUserData;
  };

  render() {
    let currentUser =
      this.props.users.length > 0
        ? this.getCurrentUserInfo(this.props.users)
        : "";
    console.log(this.state.myEditClass);
    return (
      <div id="profileholder">
        <Menu path={this.props.match.path.slice(1)} />
        {currentUser.length > 0 && (
          <div>
            <div className="profile">
              <ProfileCard
                header={currentUser[0].username}
                description={this.state.bio || "No bio available"}
              />

              <div className="buttonHolder">
                <Button
                  onClick={this.handleEdit}
                  disabled={!this.state.buttonStatus}
                >
                  Edit Profile
                </Button>
              </div>

              <div className="buttonHolder">
                <Button
                  onClick={this.handleDelete}
                  disabled={!this.state.buttonStatus}
                >
                  Delete Profile
                </Button>
              </div>
            </div>

            <div className={this.state.myEditClass}>
              <EditProfileForm
                profileId={currentUser[0].id}
                userId={currentUser[0].userId}
                handleClose={this.handleClose}
              />
            </div>
            <div className={this.state.myDeleteClass}>
              <DeleteUserForm
                profileId={currentUser[0].id}
                userId={currentUser[0].userId}
                handleClose={this.handleClose}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
    users: state.profile.allUsers,
    updateUserSuccess: state.profile.updateUserSuccess,
    getOwnDataSuccess: state.profile.getOwnDataSuccess,
    
  };
}
export default connect(mapStateToProps, {getUserInfo,getOwnData})(Profile)
