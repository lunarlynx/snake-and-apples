import styles from './GameOver.module.css';
import { fieldSize } from './Setup';

const GameOver = () => {
  return <div className={styles.over} style={{
    gridRow: '1/' + (fieldSize + 1),
    gridColumn: '1/' + (fieldSize + 1)
  }}>
    <span>Game over :(</span>
    <button type="button" onClick={() => window.location.reload()}>Try again</button>
  </div>;
};

export default GameOver;
