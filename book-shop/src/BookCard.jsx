import { Card, Button, Tag } from "antd";
import styles from "./BookCard.module.css";

function BookCard({ book, onAdd, isAdded }) {
  return (
    <Card className={styles.card}>
      <div className={styles.bookIcon}>📖</div>

      <Tag color="blue">{book.genre}</Tag>

      <h3>{book.title}</h3>

      <p className={styles.author}>
        Автор: {book.author}
      </p>

      <div className={styles.bottom}>
        <h2>{book.price} сом</h2>

        <Button
          type="primary"
          block
          disabled={isAdded}
          onClick={() => onAdd(book)}
        >
          {isAdded ? "Уже в корзине" : "В корзину"}
        </Button>
      </div>
    </Card>
  );
}

export default BookCard;