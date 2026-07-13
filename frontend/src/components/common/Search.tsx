import { useState } from "react";
import "./Search.css";

interface SearchProps {
  label?: string;
  query?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

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
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="search__input"
      />
      <button onClick={handleSubmit} className="search__button">
        Search
      </button>
    </div>
  );
}