import styles from './Square.module.css';

const Square = (props) => {
    return <div className={`${props.isTail ? styles.snaked : styles.item} ${props.isHead ? styles.head : ''}`} />;
}

export default Square;
