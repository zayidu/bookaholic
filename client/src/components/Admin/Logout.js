import React from 'react';
import axios from 'axios';

const Logout = (props) => {
  axios.get(`/api/user/logout`).then((request) => {
    setTimeout(() => {
      props.history.push('/');
    }, 1500);
  });

  return (
    <div className="logout_container">
      <h1>Aurevoir! Ah Bientot!</h1>
    </div>
  );
};

export default Logout;
