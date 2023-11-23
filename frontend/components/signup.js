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
            <FontAwesomeIcon icon={faXmark} />
            <div className={styles.header}>
                <div className={styles.logocontainer}>
                    <Image src="../logoTwitter" alt="Logo" width={100} height={100} />
                    <p className={styles.signTitle}>Create your Hackatweet account</p>
                </div>
            </div>
            <div className={styles.signSection}>
                <input type="text" placeholder="Firstname" id="signUpUsername" onChange={(e) => (e.target.value)} />
                <input type="text" placeholder="Username" id="signUpUsername" onChange={(e) => (e.target.value)} />
                <input type="password" placeholder="Password" id="signUpPassword" onChange={(e) => (e.target.value)} />
                <button id="connection" onClick={() => handleConnection()}>SignUp</button>
            </div>









        </div>
    );




}