import useDropdown from "../../hooks/useDropdown";
import { ModalDropdownProps } from "../../types/Props";
import CaretDown from "../../assets/icon-caret-down.svg?react";

export default function ModalDropdown({
  addSelection,
  categories,
  category,
}: ModalDropdownProps) {
  const { dropdownRef, toggleDropdown } = useDropdown();
  function handleSelection(
    e:
      | React.MouseEvent<HTMLUListElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>
  ) {
    addSelection(e);
    toggleDropdown();
  }
  return (
    <>
      <label>Transaction Category</label>
      <div className="dropdown">
        <div
          className="input-field"
          tabIndex={0}
          onClick={toggleDropdown}
          onKeyUp={(e) => {
            if (e.key === "Enter") toggleDropdown();
          }}
        >
          <span>{category}</span>
          <CaretDown />
        </div>
        <div
          className="select-dropdown modal-select-dropdown"
          ref={dropdownRef}
        >
          <ul onClick={handleSelection}>
            {categories?.map((item) => {
              return (
                <li
                  tabIndex={0}
                  key={item}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") handleSelection(e);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
