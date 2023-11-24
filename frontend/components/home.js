import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/user'
import Tweet from './Tweet';
import Image from 'next/Image';
import { useRouter } from 'next/router';



function Home() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value);
    const [firstname, setFirstName] = useState('');
    const [username, setUserName] = useState(user.username);
    const [message, setMessage] = useState('');
    const [isTweetAdded, setIsTweetAdded] = useState(false);
    const [messageLength, setMessageLength] = useState(0);
    const [tweets, setTweets] = useState([]);
    const currentDate = Date.parse(new Date());

    const [countLiked, setCountLiked] = useState('')

    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/users/connected/${username}`)
            .then(response => response.json())
            .then(data => {
                setFirstName(data.user.firstname)
            })

    }, [])

    useEffect(() => {
        fetch('http://localhost:3000/tweets/')
            .then(response => response.json())
            .then(data => {
                data.result && setTweets([...data.tweets])
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
            body: JSON.stringify({ firstname, username, message, date: currentDate }),
        }).then(response => response.json())
            .then(() => {
                setIsTweetAdded(!isTweetAdded);
            });
    }


    const deleteTweet = async (username, message) => {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, message })
        };

        const response = await fetch('http://localhost:3000/tweets/deleteTweet', config);
        const data = await response.json();

        return data
    }


    const getTweet = async (username, message) => {
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, message })
        }

        const response = await fetch('http://localhost:3000/tweets/getTweet', config);

        const data = await response.json();

        return data.tweet
    }



    const getIsLikedByUser = async (username, message) => {
        const tweet = await getTweet(username, message);
        const tweetId = tweet._id;

        const response = await fetch(`http://localhost:3000/tweets/${tweetId}/isLikedBy/${username}`);
        const data = await response.json();

        return data.result;

    }


    const updateLiked = async (username, message) => {

        const isLikedByUser = await getIsLikedByUser(username, message);
        const tweet = await getTweet(username, message);
        const tweetId = tweet._id;

        if (isLikedByUser) {
            const response = await fetch(`http://localhost:3000/tweets/${tweetId}/unlikedBy/${username}`);
            console.log(response)

            const data = await response.json();

            return data
        } else {
            const response = await fetch(`http://localhost:3000/tweets/${tweetId}/likedBy/${username}`);
            const data = await response.json();

            return data
        }
    }


    const tweetElements = tweets.map((e, i) => {
        return <Tweet key={i} {...e} currentDate deleteTweet={deleteTweet} updateLiked={updateLiked} />
    })

    return (
        <div className={styles.homeBody}>
            <div className={styles.leftContainer}>
                <div className={styles.logoContainer}>
                    <Image className="logo" src="/logoTwitter.png" alt="Logo" width={80} height={80} />
                </div>
                <div className={styles.profileAndButtonContainer}>
                    <div className={styles.userConnection}>
                        <img className={styles.profileImg} src="/eggProfile.jpg" alt="img" />

                        <div className={styles.profileNames}><p className={styles.firstname}>{firstname}</p>
                            <p className={styles.username}>@{username}</p>
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

                </div>

            </div>

            <div className={styles.rightContainer}>

            </div>

        </div>
    );
}

export default Home;