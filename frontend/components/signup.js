import styles from '../styles/LoginComp.module.css';
import Image from 'next/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';




function signup(props) {

    const [signUpFirstname, setSignUpFirstname] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const handleClick = () => {
        props.handleRegister(signUpFirstname, signUpUsername, signUpPassword)
        setSignUpFirstname('');
        setSignUpUsername('');
        setSignUpPassword('');
    }


    return (
        <div className={styles.container}>
            <div className={styles.xMarkContainer}>
                <FontAwesomeIcon icon={faXmark} className={styles.xMark} onClick={() => props.closeModal()} />
            </div>
            <div className={styles.logoContainer}>
                <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
            </div>

            <p className={styles.signTitle}>Create your Hackatweet account</p>

            <div className={styles.signSection}>
                <input className={styles.input} type="text" placeholder="Firstname" id="signUpFirstname" onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} />
                <input className={styles.input} type="text" placeholder="Username" id="signUpUsername" onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} />
                <input className={styles.input} type="password" placeholder="Password" id="signUpPassword" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} />
                <button className={styles.signButton} id="connection" onClick={() => handleClick()}>Sign Up</button>
            </div>
        </div>
    );




}

export default signup