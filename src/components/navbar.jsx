import { ListTodoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Search } from "./search";

export function Navbar({ onSearch, searchQuery }) {
  return (
    <nav className="sticky h-14 inset-x-0 z-50 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <div className="flex h-14 items-center justify-between border-b gap-2 border-gray-200">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-900 hover:text-gray-700"
        >
          <ListTodoIcon />
          <span className="font-semibold text-xl">todo.</span>
        </Link>

        <Search value={searchQuery} onSearch={onSearch} />
      </div>
    </nav>
  );
}
