import styles from '../styles/Tweet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoo, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

function Tweet(props) {

    const timestamp = Number(Date.parse(props.date));

    const date = new Date(timestamp);

    const year = date.getFullYear();
    const months = date.getMonth() < 9 ? '0' + date.getMonth() : date.getMonth();
    const days = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    const timeStr = `${days}/${months}/${year} à ${hours}:${minutes}:${seconds}`


    return (
        <>
            <div className={styles.tweetWrapper}>

                <div className={styles.tweetHeader}>
                    <img className={styles.profileImg} src="/eggProfile.jpg" alt="img" />
                    <div className={styles.profileNames}><p className={styles.firstname}>{props.firstname}</p>
                        <p className={styles.username}>@{props.username} </p>
                    </div>
                    <p className={`${styles.username} ${styles.dateContainer}`}>{timeStr} </p>

                </div>

                <div className={styles.message}>{props.message}</div>
                <div className={styles.messageBtnContainer}>
                    <FontAwesomeIcon icon={faHeart} className={styles.heart} onClick={() => props.updateLiked(props.username, props.message)} />
                    <FontAwesomeIcon icon={faPoo} className={styles.poo} onClick={() => props.deleteTweet(props.username, props.message)} />
                    <p>count</p>
                </div>




            </div>

        </>
    )

}

export default Tweet