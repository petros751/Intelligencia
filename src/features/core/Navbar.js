import { Menu } from 'semantic-ui-react';

function NavBar () {
  return (
    <Menu inverted>
      <Menu.Item>
        <img className="logoNavbar" src="../icons8-control-panel-48.png" />
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
