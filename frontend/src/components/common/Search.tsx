import { useState } from "react";
import "./Search.css";
import type { SearchProps } from "@/types/SearchProps";


export default function Search({
  label = "",
  query = "",
  placeholder = "Enter search term",
  onSearch,
}: SearchProps) {
  const [value, setValue] = useState(query);

  const handleSubmit = () => {
    onSearch?.(value.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="search">
      <label className="search__label" htmlFor="search__input">{label}</label>
      <div className="search__box">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search__box__input"
        />
        <button onClick={handleSubmit} className="search__box__button">
          Search
        </button>
      </div>
    </div>
  );
}