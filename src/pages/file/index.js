import React from 'react';
import styles from './styles.module.css';

function Repository() {
  const [pageVal, setPageVal] = React.useState(0);

  return (
    <div className={styles.page}>
      <div className={styles.pageNav}>
        <button className={styles.pageNavButton}>Repository</button>
        <button className={styles.pageNavButton}>Releases</button>
        <button className={styles.pageNavButton}>Commits</button>
        <button className={styles.pageNavButton}>Pull Requests</button>
        <button className={styles.pageNavButton}>Issues</button>
        <button className={styles.pageNavButton}>Comment</button>
        <button className={styles.pageNavButton}>Tags</button>
        <button className={styles.pageNavButton}>Stars</button>
        <button className={styles.pageNavButton}>Watches</button>
      </div>
      {pageVal === 0 && <div></div>}
    </div>
  );
}

export default Repository;
