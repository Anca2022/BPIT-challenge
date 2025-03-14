import useDropdown from "../../hooks/useDropdown";
import CaretDown from "../../assets/icon-caret-down.svg?react";

interface ModalDropdownProps {
  addSelection: (
    e:
      | React.MouseEvent<HTMLUListElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>
  ) => void;
  categories: string[] | null;
  category: string;
}
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
      <div className="sort">
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
        <div className="select-dropdown" ref={dropdownRef}>
          <ul onClick={handleSelection}>
            {categories &&
              categories.map((item) => {
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
