import styles from '../styles/Login.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './Signup';
import SignIn from './Signin';
import Modal from 'react-modal';
import Image from 'next/Image'
import { loginUser } from '../reducers/user'

Modal.setAppElement('body');

function Login() {

  const dispatch = useDispatch();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState();


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  const handleRegister = (firstname, username, password) => {
    fetch('http://localhost:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstname, username, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(loginUser({ username, token: data.token }));
          window.location.href = "/home"
        }
      });
  };


  const handleConnection = (username, password) => {

    fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(loginUser({ username, token: data.token }));
          window.location.href = "/home"
        }

      });
  };


  const customStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '500px',
      marginRight: '-50%',
      transform: 'translate(-50%, -92%)',
      backgroundColor: '#151d27',
      border: "none",
      borderRadius: "10px"

    },
  };


  return (

    <div className={styles.loginBody}>

      <div className={styles.bgContainer}></div>

      <div className={styles.signContainer}>

        <div className={styles.logoContainer}>
          <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
        </div>

        <h1 className={styles.bigTitle}>See what's happening</h1>

        <h2>Join Hackatweet today</h2>

        <button className={`${styles.signButton} ${styles.blue}`} onClick={() => { setIsSignIn(false); openModal() }}>Sign up</button>

        <p>Already have an account?</p>

        <button className={`${styles.signButton} ${styles.darkAndBlue}`} onClick={() => { setIsSignIn(true); openModal() }}>Sign in</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Example Modal"
          className={styles.Modal}
          overlayClassName={styles.Overlay}
          style={customStyles}
        >
          {isSignIn ? <SignIn handleConnection={handleConnection} closeModal={closeModal} />
            : <SignUp handleRegister={handleRegister} closeModal={closeModal} />}

        </Modal>


      </div>

    </div>
  );
}

export default Login;
