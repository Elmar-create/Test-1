import { Badge } from "antd";
import styles from "./Header.module.css";

function Header({ cartCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.icon}>📚</span>

        <div>
          <h1>BookStore</h1>
          <p>Магазин интересных книг</p>
        </div>
      </div>

      <div className={styles.cart}>
        <span>🛒 Корзина</span>

        <Badge
          count={cartCount}
          showZero
          color="#1677ff"
        />
      </div>
    </header>
  );
}

export default Header;