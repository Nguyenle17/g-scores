export interface SearchProps {
  label?: string;
  query?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}
