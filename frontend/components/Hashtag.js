import styles from '../styles/Hashtag.module.css';
import Image from 'next/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';




function Hashtag(props) {

    const [hashtag, setHashtag] = useState('#');


    const searchTrend = (e) => {
        const hashtagLength = e.target.value.length;
        if (hashtagLength < 2) {
            setHashtag('#')
        } else {
            setHashtag(e.target.value)
        }
    }

    return (
        <div className={styles.homeBody}>
            <div className={styles.leftContainer}>
                <div className={styles.logoContainer}>
                    <Image className="logo" src="/logoTwitter.png" alt="Logo" width={80} height={80} onClick={() => handleLogout()} />
                </div>
                {/* <div className={styles.profileAndButtonContainer}>
                    <div className={styles.userConnection}>
                        <img className={styles.profileImg} src="/eggProfile.jpg" alt="img" />

                        <div className={styles.profileNames}><p className={styles.firstname}>{firstName}</p>
                            <p className={styles.username}>@{userName}</p>
                        </div>

                    </div>
                    <button className={styles.logOutButton} id="disconnection" onClick={() => handleLogout()}>Logout</button>

                </div> */}

            </div>

            <div className={styles.centerContainer}>
                <h2 className={styles.pageTitle}>Home</h2>
                <div className={styles.writeTweet}>
                    <input className={styles.input} type="text" id="hashtagField" onChange={(e) => searchTrend(e)} value={hashtag} />


                </div>

                <div className={styles.tweetContainer}>
                    {/* {tweetElements}
                    <FontAwesomeIcon icon={faPoo} className={styles.poo} onClick={() => deleteTweet()} /> */}
                </div>

            </div>

            <div className={styles.rightContainer}>

            </div>

        </div>
    )
};

export default Hashtag;


