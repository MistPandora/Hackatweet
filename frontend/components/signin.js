import styles from '../styles/Home.module.css';
import Image from 'next/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';



function signin() {

    const handleConnection = () => {

        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signInUsername, password: signInPassword }),
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
            <div className={styles.xMarkContainer}>
                <FontAwesomeIcon icon={faXmark} className={styles.xMark} />
            </div>
            <div className={styles.logoContainer}>
                <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
            </div>
            <p className={styles.signTitle}>Connect to Hackatweet </p>

            <div className={styles.signSection}>
                <input className={styles.input} type="text" placeholder="Username" id="signInUsername" onChange={(e) => (e.target.value)} />
                <input className={styles.input} type="password" placeholder="Password" id="signInPassword" onChange={(e) => (e.target.value)} />
                <button className={styles.signButton} id="connection" onClick={() => handleConnection()}>Sign in</button>
            </div>

        </div>
    )
};

export default signin;


