import OverviewIcon from "../assets/icon-nav-overview.svg?react";
import TranzactionsIcon from "../assets/icon-nav-transactions.svg?react"; 
import BudgetsIcon from "../assets/icon-nav-budgets.svg?react";
import PotsIcon from "../assets/icon-nav-pots.svg?react";
import RecurringBillsIcon from "../assets/icon-nav-recurring-bills.svg?react";
import MenuOption from "../types/MenuOption";

const navbarOptions : MenuOption[] = [
    {
        icon: OverviewIcon,
        label: 'Home', 
        route: '/home'
    }, 
    {
        icon: TranzactionsIcon, 
        label: 'Transactions',
        route: '/' 
    }, 
    {
        icon: BudgetsIcon, 
        label: 'Budgets',
        route: '/budgets'
    }, 
    {
        icon: PotsIcon, 
        label: 'Pots',
        route: '/pots'
    }, 
    {
        icon: RecurringBillsIcon,
        label: 'Bills',
        route: '/bills'
    }, 
]
export default navbarOptions; 