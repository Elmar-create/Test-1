import { Empty } from "antd";
import BookCard from "./BookCard.jsx";
import styles from "./BookList.module.css";

function BookList({ books, cart, onAdd }) {
  if (books.length === 0) {
    return (
      <div className={styles.empty}>
        <Empty description="Книги не найдены" />
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onAdd={onAdd}
          isAdded={cart.some(
            (item) => item.id === book.id
          )}
        />
      ))}
    </div>
  );
}

export default BookList;