import { useRef } from 'react';
import SearchIcon from '../../assets/icon-search.svg?react'; 
import SortIcon from '../../assets/icon-sort-mobile.svg?react'; 
import FilterIcon from '../../assets/icon-filter-mobile.svg?react';
import CarretDown from '../../assets/icon-caret-down.svg?react';
import './searchAndFilter.scss';

export default function SearchAndFilter(){
    const sortDropdownRef=useRef<HTMLDivElement>(null); 
    const filterDropdownRef=useRef<HTMLDivElement>(null);
    function toggleDropdown(ref : React.RefObject<HTMLDivElement>){
        ref.current?.classList.toggle("display-dropdown"); 
    }
    function closeDropdown(ref : React.RefObject<HTMLDivElement>){
        ref.current?.classList.remove("display-dropdown"); 
    }

    return(
        <div className='search-and-filter-transactions'>
            <div className='search input-field'>
                <input type="text" placeholder='Search transaction'/>
                <SearchIcon/>
            </div>
            
            <div className="sort-filter">
                <div className='sort'
                tabIndex={0} 
                onClick={()=>toggleDropdown(sortDropdownRef)}
                onBlur={()=> closeDropdown(sortDropdownRef)}
                >
                    <div className='sort-mobile'>
                        <SortIcon/>
                    </div>
                    <div className='sort-desktop'>
                        <span>Sort By</span>
                        <div className="input-field">
                            <span>Latest</span>
                            <CarretDown/>
                        </div>
                    </div>
                    <div className="select-dropdown" ref={sortDropdownRef}>
                        <ul>
                            <li className='selected-option'>Latest</li>
                            <li>Oldest</li>
                            <li>Highest</li>
                            <li>Lowest</li>
                        </ul>
                    </div> 
                </div>
                <div className='filter' 
                tabIndex={0}
                onClick={()=>toggleDropdown(filterDropdownRef)}
                onBlur={()=> closeDropdown(filterDropdownRef)}
                >
                    <div className='filter-mobile'>
                        <FilterIcon/>
                    </div>
                    <div className='filter-desktop'>
                        <span>Category</span>  
                        <div className="input-field">
                            <span>All Transactions</span>
                            <CarretDown/>
                        </div>
                    </div>
                    <div className="select-dropdown" ref={filterDropdownRef}>
                        <ul>
                            <li className='selected-option'>All Transactions</li>
                            <li>Sports</li>
                            <li>Groceries</li>
                            <li>Lifestyle</li>
                            <li>Sports</li>
                            <li>Groceries</li>
                            <li>Lifestyle</li>
                        </ul>
                    </div>
                </div>
            </div>  
        </div>
    );
}