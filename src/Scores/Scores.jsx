import styles from './Scores.module.css';
import React from 'react';

const Scores = (props) => {
  return  <div className={styles.scores}>
    Scores: {props.score}
  </div>
}

export default Scores;
