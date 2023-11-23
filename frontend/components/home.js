import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/user'
import { addTweetToStore, removeTweetToStore } from '../reducers/tweets';
import Tweet from './Tweet';
import Image from 'next/Image';


function Home() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [firstName, setFirstName] = useState('');
    const [userName, setUserName] = useState(user.username);
    const [message, setMessage] = useState('');
    const tweets = useSelector((state) => state.tweets.value);
    const [messageLength, setMessageLength] = useState(0)

    const currentDate = Date.parse(new Date());

    useEffect(() => {
        fetch(`http://localhost:3000/users/connected/${userName}`)
            .then(response => response.json())
            .then(data => {
                setFirstName(data.user.firstname)
            })

    }, [])

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const sendTweet = () => {
        dispatch(addTweetToStore({ firstname: firstName, username: userName, message, date: currentDate }))

    }



    const tweetElements = tweets.map((e, i) => <Tweet {...e} currentDate={currentDate} />)


    return (
        <div className={styles.homeBody}>
            <div className={styles.leftContainer}>
                <div className={styles.logoContainer}>
                    <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
                </div>
                <div className={styles.profileAndButtonContainer}>
                    <div className={styles.userConnection}>
                        <Image className={styles.profileImg} src="/eggProfile.jpg" alt="img" width={80} height={80} />

                        <div className={styles.profileNames}><p className={styles.firstname}>{firstName}</p>
                            <p className={styles.username}>@{userName}</p>
                        </div>

                    </div>
                    <button className={styles.logOutButton} id="disconnection" onClick={() => handleLogout()}>Logout</button>

                </div>

            </div>

            <div className={styles.centerContainer}>
                <div className={styles.writeTweet}>
                    <input className={styles.input} type="text" placeholder="What's up?" id="newTweet" onChange={(e) => { setMessage(e.target.value); setMessageLength(e.target.value.length) }} value={message} maxLength={280} />

                    <div className={styles.bottomMessage}>
                        <p className={styles.letterCounter}>{messageLength}/280</p>
                        <button className={styles.tweetButton} id="tweet" onClick={() => sendTweet()}>Tweet</button>
                    </div>
                </div>
            </div>

            <div className={styles.rightContainer}>

            </div>

        </div>
    );
}

export default Home;