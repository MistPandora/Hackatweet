import styles from '../styles/LoginComp.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './signup';
import SignIn from './signin';
import { Popover, Button } from 'antd';


function LoginComp() {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.user.value);


  const handleRegister = (firstname, username, password) => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ username, token: data.token }));
      });
  };


  const handleConnection = (username, password) => {

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(response => response.json())
      .then(data => {
        data.result && dispatch(login({ username, token: data.token }));
      });
  };




  return (
    <div className={styles.container}>

      <Popover title="Sign Up" content={<SignUp handleRegister={handleRegister} />} className={styles.popover} trigger="click">
        <Button>Sign up</Button>
      </Popover>

      <Popover title="Sign Up" content={<SignIn handleConnection={handleConnection} />} className={styles.popover} trigger="click">
        <Button>Sign in</Button>
      </Popover>


    </div>
  );
}

export default LoginComp;
