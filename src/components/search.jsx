import { SearchIcon } from "lucide-react";
import { Input } from "./input";

export function Search({ value, onSearch }) {
  return (
    <Input
      icon={SearchIcon}
      value={value}
      onChange={onSearch}
      placeholder="Search..."
    />
  );
}
