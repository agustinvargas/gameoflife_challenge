import React from 'react';
import AboutIcon from '../Icons/AboutIcon';
import SettingsIcon from '../Icons/SettingsIcon';
import MenuIcon from '../MenuIcon/MenuIcon';
import Logo from '../Logo/Logo';
const Header = () => {
  return (
    <div className='header-container'>
      <MenuIcon icon={<AboutIcon />} type='about' />
      <Logo />
      <MenuIcon icon={<SettingsIcon />} type='settings' />
    </div>
  );
};

export default Header;
