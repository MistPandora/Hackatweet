import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './signup';

function Home() {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.user.value);

  const handleRegister = () => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: signUpFirstname, username: signUpUsername, password: signUpPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: signUpUsername, token: data.token }));
          setSignUpUsername('');
          setSignUpPassword('');
          setIsModalVisible(false)
        }
      });
  };

  const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName: signInFirstname, username: signInUsername, password: signInPassword }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ username: signInUsername, token: data.token }));
          setSignInUsername('');
          setSignInPassword('');
          setIsModalVisible(false)
        }
      });
  };






  return (
    <div className={styles.container}>

      <Popover title="Sign Up" content={<SignUp />} className={styles.popover} trigger="click">
        <Button>Sign Up</Button>
      </Popover>




    </div>
  );
}

export default Home;
