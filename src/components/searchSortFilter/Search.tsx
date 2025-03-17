import { SearchProps } from "../../types/Props";
import SearchIcon from "../../assets/icon-search.svg?react";

export default function Search({ searchWord, search }: SearchProps) {
  return (
    <div className="search input-field">
      <input
        type="text"
        placeholder="Search transaction"
        value={searchWord}
        onChange={search}
      />
      <SearchIcon />
    </div>
  );
}
