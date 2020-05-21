import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {logout} from '../actions'

class MenuBar extends Component {
    state = { activeItem: this.props.path};
    

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;

    return (
      <div>
        <Menu pointing>
          <Menu.Item
            name="logo"
            active={activeItem === "logo"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="blogs"
            active={activeItem === "blogs"}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position="right">
            <Link to="/" onClick={this.props.logout}>
              <Menu.Item
                name="logout"
                active={activeItem === "logout"}
                
              />
            </Link>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default connect(null,{logout})(MenuBar)
