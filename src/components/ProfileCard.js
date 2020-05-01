import React from "react";
import { Card} from "semantic-ui-react";
import profileImage from '../images/default-profile.png'



const ProfileCard = (props) => (
  <Card
    image={profileImage}
    header={props.header}
    
    description={props.description}
    
  />
);

export default ProfileCard;
