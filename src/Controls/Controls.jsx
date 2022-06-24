import styles from './Controls.module.css';
import Button from  './Button';
import React from 'react';

const Controls = (props) => {

  return <div className={styles.controls}>
    <Button id={"up"} direct={props.direct} noGame={props.noGame} />
    <Button id={"right"} direct={props.direct} noGame={props.noGame} />
    <Button id={"down"} direct={props.direct} noGame={props.noGame} />
    <Button id={"left"} direct={props.direct} noGame={props.noGame} />
  </div>
}

export default Controls;
