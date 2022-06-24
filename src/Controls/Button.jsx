import styles from './Button.module.css';
import { FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowAltCircleUp } from 'react-icons/fa';
import React from 'react';

const Button = (props) => {

  let dir = props.id;
  return <button id={styles[dir]} onClick={() => props.direct(dir)} disabled={props.noGame}>
    {
      (dir === 'up' ? (
        <FaArrowAltCircleUp/>
      ) : (
        dir === 'down' ? (
          <FaArrowAltCircleDown/>
        ) : (
          dir === 'left' ? (
            <FaArrowAltCircleLeft/>
          ) : (
            dir === 'right' ? (
              <FaArrowAltCircleRight/>
            ) : ''))))
    }
  </button>;
};

export default Button;
