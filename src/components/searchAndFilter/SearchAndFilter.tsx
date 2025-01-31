import { useRef } from 'react';
import SearchIcon from '../../assets/icon-search.svg?react'; 
import SortIcon from '../../assets/icon-sort-mobile.svg?react'; 
import FilterIcon from '../../assets/icon-filter-mobile.svg?react';
import CaretDown from '../../assets/icon-caret-down.svg?react';
import './searchAndFilter.scss';
import '../inputField.scss';

interface Props{
    categories:string[] | null;
    category:string;
    sortWord:string;
    search: (e:React.ChangeEvent<HTMLInputElement>)=>void;
    filter: (e:React.MouseEvent<HTMLUListElement, MouseEvent>)=>void;
    sort: (e:React.MouseEvent<HTMLUListElement, MouseEvent>)=>void;
}
export default function SearchAndFilter({search, filter, sort, categories, category, sortWord}: Props){
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
                <input type="text" placeholder='Search transaction' onChange={(e)=>search(e)}/>
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
                            <span>{sortWord}</span>
                            <CaretDown/>
                        </div>
                    </div>
                    <div className="select-dropdown" ref={sortDropdownRef}>
                        <ul onClick={(e)=> sort(e)}>
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
                            <span>{category}</span>
                            <CaretDown/>
                        </div>
                    </div>
                    <div className="select-dropdown" ref={filterDropdownRef}>
                        <ul onClick={(e)=>filter(e)}>
                            <li className='selected-option'>All Transactions</li>
                            {categories &&
                            categories.map(item => {
                                return <li key={item}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>  
        </div>
    );
}