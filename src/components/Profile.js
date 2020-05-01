import React from "react";
import Menu from "./Menu";
import ProfileCard from "./ProfileCard";
import EditProfileForm  from "./EditProfileForm";
import { Button } from "semantic-ui-react";
import "./Profile.css";
import { connect } from 'react-redux'
import {getUserInfo, getOwnData} from '../actions'
class Profile extends React.Component {
  state = { myClass: "hide", id: '', bio: 'No bio available' }
  handleEdit = (event) => {
    this.setState({myClass:'profile'})
  }
  componentDidMount() {
    this.props.getUserInfo()
  }
  componentDidUpdate(prevProps) {
    let userData = []
    if (this.props.users.length > 0) {
      userData = this.getCurrentUserInfo(this.props.users);
      if (this.props.users !== prevProps.users) {
        this.setState({bio:userData[0].body})
      }
    }
   
    if (this.props.updateUserSuccess !== prevProps.updateUserSuccess) {
      console.log(this.props.updateUserSuccess)
      this.setState({bio:this.props.updateUserSuccess.body})
    }
  }
  
  getCurrentUserInfo = (userInfo) => {
    let curUserData = userInfo.filter(user => user.username === this.props.authToken.username)
    return curUserData
  }
  render() {
    console.log(this.state.bio)
    let currentUser = this.props.users.length > 0 ? this.getCurrentUserInfo(this.props.users) : ""
    return (
      <div id="profileholder">
        <Menu path={this.props.match.path.slice(1)} />
        {currentUser && <div><div className="profile">
          <ProfileCard header={currentUser[0].username} description={this.state.bio||'No bio available'}/>
          
          <div className="buttonHolder">
            <Button onClick={this.handleEdit}>Edit Profile</Button>
          </div>
          <div className="buttonHolder">
            <Button>Get Messages</Button>
          </div>
          <div className="buttonHolder">
            <Button>Delete Profile</Button>
          </div>
        </div>
        
          <div className={this.state.myClass}>
            <EditProfileForm userId={currentUser[0].id}/>
          </div>
        </div>
        }
  
      </div>
    
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
    users: state.profile.allUsers,
    updateUserSuccess: state.profile.updateUserSuccess,
    getOwnDataSuccess:state.profile.getOwnDataSuccess
  };
}
export default connect(mapStateToProps, {getUserInfo,getOwnData})(Profile)
