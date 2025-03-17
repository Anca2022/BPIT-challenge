import useDropdown from "../../hooks/useDropdown";
import { DropdownProps } from "../../types/Props";
import CaretDown from "../../assets/icon-caret-down.svg?react";

export default function Dropdown({
  handleSortOrFilter,
  name,
  word,
  categories,
  icon: Icon,
}: DropdownProps) {
  const { dropdownRef, toggleDropdown, closeDropdown } = useDropdown();
  const mappingCategories =
    name == "sort"
      ? categories
      : categories && ["All Transactions", ...categories];
  const text = name == "sort" ? "Sort By" : "Category";
  return (
    <div
      className="dropdown"
      tabIndex={0}
      onClick={toggleDropdown}
      onBlur={closeDropdown}
    >
      <div className="dropdown-mobile">
        <Icon />
      </div>
      <div className="dropdown-desktop">
        <span>{text}</span>
        <div className="input-field">
          <span>{word}</span>
          <CaretDown />
        </div>
      </div>
      <div className="select-dropdown" ref={dropdownRef}>
        <ul onClick={handleSortOrFilter}>
          {mappingCategories?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
