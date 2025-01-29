export default function SearchAndFilter(){
    return(
        <div className='search-and-filter-transactions'>
            <input type="text" placeholder='Search transaction'/>
            <div className='sort'>
                Sort By
                <select name="" id="">
                    <option value="">Latest</option>
                    <option value="">Oldest</option>
                    <option value="">Highest amount </option>
                    <option value="">Lowest amount</option>
                </select>
                {/* in loc de select - un div ca sa personalizam */}
            </div>
            <div className='filter'>
                Category: 
                <select name="" id="">
                    <option value="">Latest</option>
                    <option value="">Oldest</option>
                    <option value="">Highest amount </option>
                    <option value="">Lowest amount</option>
                </select>
            </div>
        </div>
    );
}