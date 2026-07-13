import "./Header.css";

interface HeaderProps {
  title?: string;
}

export default function Header({
  title = "G-Scores",
}: HeaderProps) {
  return (
    <header className="app-header">
      <h1 className="app-header__title">{title}</h1>
    </header>
  );
}