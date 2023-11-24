import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/user'
import Tweet from './Tweet';
import Image from 'next/Image';
import { useRouter } from 'next/router';



function Home() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState(user.username);
    const [message, setMessage] = useState('');
    const [isTweetAdded, setIsTweetAdded] = useState(false);
    const [messageLength, setMessageLength] = useState(0);

    const currentDate = Date.parse(new Date());

    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/users/connected/${userName}`)
            .then(response => response.json())
            .then(data => {
                setFirstName(data.user.firstname)
            })

    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/tweets/')
            .then(response => response.json())
            .then(data => {
                setTweets(data.tweets)
            })
    }, [isTweetAdded])

    const handleLogout = () => {
        dispatch(logoutUser());
        router.push('/')
    };

    const sendTweet = () => {

        fetch('http://localhost:3000/tweets/newTweet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: firstName, username: userName, message, date: currentDate }),
        }).then(response => response.json())
            .then(() => {
                setIsTweetAdded(!isTweetAdded);
            });



    }

    // const deleteTweet = () => {
    //     dispatch(removeTweetToStore({ firstname: firstName, username: userName, message }))
    // }

    // const tweetElements = tweets.map((e, i) => <Tweet {...e} currentDate={currentDate} />)


    return (
        <div className={styles.homeBody}>
            <div className={styles.leftContainer}>
                <div className={styles.logoContainer}>
                    <Image className="logo" src="/logoTwitter.png" alt="Logo" width={80} height={80} onClick={() => handleLogout()} />
                </div>
                <div className={styles.profileAndButtonContainer}>
                    <div className={styles.userConnection}>
                        <img className={styles.profileImg} src="/eggProfile.jpg" alt="img" />

                        <div className={styles.profileNames}><p className={styles.firstname}>{firstName}</p>
                            <p className={styles.username}>@{userName}</p>
                        </div>

                    </div>
                    <button className={styles.logOutButton} id="disconnection" onClick={() => handleLogout()}>Logout</button>

                </div>

            </div>

            <div className={styles.centerContainer}>
                <h2 className={styles.pageTitle}>Home</h2>
                <div className={styles.writeTweet}>
                    <textarea className={styles.input} type="text" placeholder="What's up?" id="newTweet" onChange={(e) => { setMessage(e.target.value); setMessageLength(e.target.value.length) }} maxLength={280} value={message} style={{ 'resize': 'none' }} />

                    <div className={styles.bottomWriteTweet}>
                        <p className={styles.letterCounter}>{messageLength}/280</p>
                        <button className={styles.tweetButton} id="tweet" onClick={() => sendTweet()}>Tweet</button>
                    </div>
                </div>

                <div className={styles.tweetContainer}>
                    {tweetElements}
                    <FontAwesomeIcon icon={faPoo} className={styles.poo} onClick={() => deleteTweet()} />
                </div>

            </div>

            <div className={styles.rightContainer}>

            </div>

        </div>
    );
}

export default Home;