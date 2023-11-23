import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './signup';
import { Popover, Button } from 'antd';
function Home() {
  const dispatch = useDispatch();
  //const user = useSelector((state) => state.user.value);








  return (
    <div className={styles.container}>

      <Popover title="Sign Up" content={<SignUp />} className={styles.popover} trigger="click">
        <Button>Sign up</Button>
        <Button>Sign in</Button>
      </Popover>




    </div>
  );
}

export default Home;
