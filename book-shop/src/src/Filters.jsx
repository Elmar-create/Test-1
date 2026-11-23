import { Input, Select } from "antd";
import styles from "./Filters.module.css";

function Filters({
  search,
  setSearch,
  genre,
  setGenre,
}) {
  const genres = [
    "Все",
    "Роман",
    "Классика",
    "Фэнтези",
    "Детектив",
    "Сказка",
  ];

  return (
    <div className={styles.filters}>
      <Input
        placeholder="Поиск по названию книги..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        size="large"
        allowClear
      />

      <Select
        value={genre}
        onChange={setGenre}
        size="large"
        className={styles.select}
        options={genres.map((item) => ({
          value: item,
          label: item === "Все" ? "Все жанры" : item,
        }))}
      />
    </div>
  );
}

export default Filters;