import styles from '../styles/Home.module.css';

function Home() {
  const activities = [
    {
      name: 'SPORT',
      timer: 495,
    },
    {
      name: 'WORK',
      timer: 2074,
    },
  ];

  const activitiesComponents = activities.map((data, i) => {
    return <Activity key={i} name={data.name} timer={data.timer} />;
  });

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        <div className={styles.trackerWindow}>
          <div className={styles.trackerHeader}>
            Time tracker
          </div>
          <div className={styles.addSection}>
            <input type="text" placeholder="Activity name" id="activityName" />
            <button id="add">Add activity</button>
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        {activitiesComponents}
      </div>
    </div>
  );
}

export default Home;
