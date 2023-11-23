import styles from '../styles/Home.module.css';
import Image from 'next/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';




function signup() {

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


    return (
        <div className={styles.container}>
            <div className={styles.xMarkContainer}>
                <FontAwesomeIcon icon={faXmark} className={styles.xMark} />
            </div>
            <div className={styles.logoContainer}>
                <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
            </div>

            <p className={styles.signTitle}>Create your Hackatweet account</p>

            <div className={styles.signSection}>
                <input className={styles.input} type="text" placeholder="Firstname" id="signUpUsername" onChange={(e) => (e.target.value)} />
                <input className={styles.input} type="text" placeholder="Username" id="signUpUsername" onChange={(e) => (e.target.value)} />
                <input className={styles.input} type="password" placeholder="Password" id="signUpPassword" onChange={(e) => (e.target.value)} />
                <button className={styles.signButton} id="connection" onClick={() => handleConnection()}>Sign Up</button>
            </div>









        </div>
    );




}

export default signup