import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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




  const activitiesComponents = activities.map((data, i) => {
    return <Activity key={i} name={data.name} timer={data.timer} />;
  });

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.trackerWindow}>
          <div className={styles.trackerHeader}>
            Time tracker
          </div>
          <div className={styles.addSection}>
            <input type="text" placeholder="Activity name" id="activityName" />
            <button id="add">Add activity</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        {activitiesComponents}
      </div>
    </div>
  );
}

export default Home;
