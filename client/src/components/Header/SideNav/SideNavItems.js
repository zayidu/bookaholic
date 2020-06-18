import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const SideNavItems = () => {
  const items = [
    {
      type: 'navItem',
      icon: 'home',
      text: 'Home',
      link: '/',
      restricted: false,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My Profile',
      link: '/user',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add Admins',
      link: '/user/register',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Login',
      link: '/login',
      restricted: false,
      exclude: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'My reviews',
      link: '/user/user-reviews',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Add reviews',
      link: '/user/add',
      restricted: true,
    },
    {
      type: 'navItem',
      icon: 'file-text-o',
      text: 'Logout',
      link: '/user/logout',
      restricted: true,
    },
  ];

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  const showItems = () => {
    return items.map((item, i) => {
      return element(item, i);
    });
  };

  return <div> {showItems()} </div>;
};

export default SideNavItems;
