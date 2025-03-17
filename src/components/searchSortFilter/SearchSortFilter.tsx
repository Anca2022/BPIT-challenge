import Search from "./Search";
import Dropdown from "./Dropdown";
import sortCategories from "../../data/sortOptions";
import { SearchSortFilterProps } from "../../types/Props";
import SortIcon from "../../assets/icon-sort-mobile.svg?react";
import FilterIcon from "../../assets/icon-filter-mobile.svg?react";
import "./searchSortFilter.scss";
import "../inputField.scss";

export default function SearchSortFilter({
  search,
  filter,
  sort,
  categories,
  category,
  sortWord,
  searchWord,
}: SearchSortFilterProps) {
  return (
    <div className="search-and-filter-transactions">
      <Search search={search} searchWord={searchWord} />
      <div className="sort-filter-container">
        <Dropdown
          name="sort"
          handleSortOrFilter={sort}
          categories={sortCategories}
          word={sortWord}
          icon={SortIcon}
        />
        <Dropdown
          name="filter"
          handleSortOrFilter={filter}
          categories={categories}
          word={category}
          icon={FilterIcon}
        />
      </div>
    </div>
  );
}
