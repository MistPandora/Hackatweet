import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPoo, faHeart } from '@fortawesome/free-solid-svg-icons';

function Tweet(props) {



    return (
        <>
            <div className={styles.userConnection}>
                <img className={styles.profileImg} src="/eggProfile.jpg" alt="img" />
                <div className={styles.profileNames}><p className={styles.firstname}>{props.firstname}</p>
                    <p className={styles.username}>@{props.username}</p>
                    <p>{props.currentDate - props.date}</p>
                </div>
                <div className={styles.message}>{props.message}</div>
                <FontAwesomeIcon icon={faHeart} className={styles.heart} onClick={() => props.liked()} />
                <FontAwesomeIcon icon={faPoo} className={styles.poo} onClick={() => props.deleteTweet()} />
                <p>count</p>



            </div>

        </>
    )

}

export default Tweet