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

    const tweetElements = tweets.map((e, i) => <Tweet {...e} currentDate={currentDate} />)


    return (
        <div className={styles.homeBody}>
            <div className={styles.leftContainer}>
                <div className={styles.logoContainer}>
                    <Image className={styles.logo} src="/logoTwitter.png" alt="Logo" width={80} height={80} />
                </div>
                <div className={styles.userConnection}>
                    <p>connection of user: {firstName.length}</p>
                </div>
                <button className={styles.logOutButton} id="disconnection" onClick={() => handleLogout()}>Logout</button>
                <div className={styles.writeTweet}>
                    <input className={styles.input} type="text" placeholder="What's up?" id="newTweet" onChange={(e) => setMessage(e.target.value)} value={message} /> </div>
            </div>

            <div className={styles.centerContainer}>

            </div>

            <div className={styles.rightContainer}>

            </div>

        </div>
    );
}

export default Home;