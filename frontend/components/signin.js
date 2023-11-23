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
            <FontAwesomeIcon icon={faXmark} />
            <div className={styles.header}>
                <div className={styles.logocontainer}>
                    <Image src="../logoTwitter" alt="Logo" width={100} height={100} />
                    <p className={styles.signTitle}>Connect to Hackatweet </p>
                </div>
            </div>
            <div className={styles.signSection}>
                <input type="text" placeholder="Username" id="signInUsername" onChange={(e) => (e.target.value)} />
                <input type="password" placeholder="Password" id="signInPassword" onChange={(e) => (e.target.value)} />
                <button id="connection" onClick={() => handleConnection()}>Sign in</button>
            </div>

        </div>
    )
};



