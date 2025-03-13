import NavbarItem from "../navbarItem/NavbarItem";
import Logo from "../../../assets/logo.svg?react";
import MenuOption from "../../../types/MenuOption";
import navbarOptions from "../../../data/navbarOptions";
import "./navbarComponent.scss";

export default function NavbarComponent() {
  return (
    <aside className="navbar-container">
      <header className="navbar-header">
        <Logo />
      </header>
      <nav>
        <ul className="navbar-items">
          {navbarOptions.map((item: MenuOption): JSX.Element => {
            return (
              <li key={item.label}>
                <NavbarItem {...item} />
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
