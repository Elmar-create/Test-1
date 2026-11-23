import { useState, useEffect } from "react";
import { Spin } from "antd";

import Header from "./Header.jsx";
import Filters from "./Filters.jsx";
import BookList from "./BookList.jsx";
import Cart from "./Cart.jsx";

import initialBooks from "./books.js";

import styles from "./App.module.css";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart.filter(
        (item) =>
          item &&
          Number.isInteger(item.id) &&
          typeof item.price === "number" &&
          typeof item.title === "string"
      );
    } catch {
      return [];
    }
  });

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("Все");

  // Загрузка книг через 1,5 секунды
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooks(initialBooks);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Сохранение корзины
  useEffect(() => {
    try {
      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error("Ошибка сохранения корзины:", error);
    }
  }, [cart]);

  // Изменение заголовка вкладки
  useEffect(() => {
    document.title = `Корзина (${cart.length})`;
  }, [cart]);

  // Добавление книги
  const addToCart = (book) => {
    setCart((prevCart) => {
      const alreadyAdded = prevCart.some(
        (item) => item.id === book.id
      );

      if (alreadyAdded) {
        return prevCart;
      }

      return [...prevCart, book];
    });
  };

  // Удаление книги
  const removeFromCart = (id) => {
    setCart((prevCart) =>
      prevCart.filter((book) => book.id !== id)
    );
  };

  // Поиск и фильтрация
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "Все" || book.genre === genre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div className={styles.app}>
      <Header cartCount={cart.length} />

      <main className={styles.container}>
        <div className={styles.heading}>
          <h2>Каталог книг</h2>
          <p>Найдите свою следующую любимую книгу</p>
        </div>

        <Filters
          search={search}
          setSearch={setSearch}
          genre={genre}
          setGenre={setGenre}
        />

        {loading ? (
          <div className={styles.loader}>
            <Spin size="large" tip="Загрузка книг...">
              <div className={styles.spinContent} />
            </Spin>
          </div>
        ) : (
          <BookList
            books={filteredBooks}
            cart={cart}
            onAdd={addToCart}
          />
        )}

        <Cart
          cart={cart}
          onRemove={removeFromCart}
        />
      </main>

      <footer className={styles.footer}>
        © 2026 BookStore. Книжный магазин.
      </footer>
    </div>
  );
}

export default App;