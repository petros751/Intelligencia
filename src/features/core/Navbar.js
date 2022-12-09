import { Menu } from 'semantic-ui-react';

function NavBar () {
  return (
    <Menu inverted>
      <Menu.Item>
        <img className="logoNavbar" src="../OLS_logo.png" />
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
