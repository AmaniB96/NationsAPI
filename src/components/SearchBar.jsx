import { useState } from "react"
import "./searchBar.css"

export default function SearchBar({onSearch, onTri}) {
    
    const [search,setSearch] = useState("")

    const handleSearch = (e) => {
        setSearch(e.target.value)
        onSearch(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSearch(search)
    }

    


    return(
        <>
        <div className="search-filter-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder="Search for a Country..."
                    className="search-input"
                />
            </form>
        </div>
        
        <div className="filter-buttons">
            <button onClick={() => onTri("africa")}>Afrique</button>
            <button onClick={() => onTri("europe")}>Europe</button>
            <button onClick={() => onTri("americas")}>Americas</button>
            <button onClick={() => onTri("oceania")}>Oceania</button>
            <button onClick={() => onTri("asia")}>Asia</button>
        </div>
        </>
    )
}