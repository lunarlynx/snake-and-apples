import styles from './Scores.module.css';
import React from 'react';

const Scores = (props) => {
  return  <div className={styles.info}>
    <div className={styles.level}>Level: {props.level}</div>
    <div className={styles.scores}>Scores: {props.score}</div>
  </div>
}

export default Scores;
