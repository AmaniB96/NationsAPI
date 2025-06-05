import { useState } from "react"

export default function SearchBar({onSearch}) {
    
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
         <form onSubmit={handleSubmit}>
        <input 
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search for a Country..."
        />
        </form>
        </>
    )
}