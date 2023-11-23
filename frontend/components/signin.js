import styles from '../styles/LoginComp.module.css';
import Image from 'next/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';




function signin(props) {

    const [signInUsername, setSignInUsername] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const handleClick = () => {
        props.handleConnection(signInUsername, signInPassword);
        setSignInUsername('');
        setSignInPassword('');
    }


    return (
        <div className={styles.container}>
            <div className={styles.xMarkContainer}>
                <FontAwesomeIcon icon={faXmark} className={styles.xMark} />
            </div>
            <div className={styles.logoContainer}>
                <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
            </div>
            <p className={styles.signTitle}>Connect to Hackatweet </p>

            <div className={styles.signSection}>
                <input className={styles.input} type="text" placeholder="Username" id="signInUsername" onChange={(e) => setSignInUsername(e.target.value)} value={signInUsername} />
                <input className={styles.input} type="password" placeholder="Password" id="signInPassword" onChange={(e) => setSignInPassword(e.target.value)} value={signInPassword} />
                <button className={styles.signButton} id="connection" onClick={() => handleClick()}>Sign in</button>
            </div>

        </div >
    )
};

export default signin;


