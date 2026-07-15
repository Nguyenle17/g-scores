import "./Header.css";
import type { HeaderProps } from "@/types/HeaderProps";

export default function Header({
  title = "G-Scores",
}: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-header__title">{title}</h1>
    </header>
  );
}