import { useRef } from "react";

export default function useDropdown() {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  function toggleDropdown() {
    dropdownRef.current?.classList.toggle("display-dropdown");
  }
  return { dropdownRef, toggleDropdown };
}
