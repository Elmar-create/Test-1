import { Button, Card, Empty } from "antd";
import styles from "./Cart.module.css";

function Cart({ cart, onRemove }) {
  const total = cart.reduce(
    (sum, book) => sum + book.price,
    0
  );

  return (
    <Card
      title="🛒 Ваша корзина"
      className={styles.cart}
    >
      {cart.length === 0 ? (
        <Empty description="Корзина пока пуста" />
      ) : (
        cart.map((book) => (
          <div key={book.id} className={styles.item}>
            <div className={styles.info}>
              <h4>{book.title}</h4>
              <span>{book.price} сом</span>
            </div>

            <Button
              danger
              onClick={() => onRemove(book.id)}
            >
              Удалить
            </Button>
          </div>
        ))
      )}

      <div className={styles.total}>
        <span>Итого:</span>
        <strong>{total} сом</strong>
      </div>
    </Card>
  );
}

export default Cart;