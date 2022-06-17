import styles from './GameOver.module.css';

const GameOver = () => {
  return <div className={styles.over}>
    <span>Game over :(</span>
    <button type="button" onClick={() => window.location.reload()}>Try again</button>
  </div>;
};

export default GameOver;
