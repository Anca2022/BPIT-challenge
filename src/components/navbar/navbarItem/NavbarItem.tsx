import { NavLink } from "react-router-dom";
import "./navbarItem.scss";
import MenuOption from "../../../types/MenuOption";

export default function NavbarItem({icon:Icon, label, route}: MenuOption){
    return(
        <NavLink to={route} 
        className={({isActive})=> isActive ? "navbar-item selected":"navbar-item"}
        >
           <span 
            className='navbar-item-icon'
            role="img"
            aria-label={`icon for ${label}`}
            >
                <Icon/>
            </span>
            <span className='navbar-item-label'>{label}</span>
        </NavLink>
    )
}