import { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'
import SearchBar from '../components/searchBar'

export default function Home() {
    
    const [data, setData] = useState(null)
    const [filteredData, setFilteredData] = useState(null)

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
        .then((response) => {setData(response.data) 
                            setFilteredData(response.data)})
        .catch((error) => console.log(error));
    }, [])

    const handleSearch = (searchTerm) => {
        if (!searchTerm) {
            setFilteredData(data)
            return
        }
        const filtered = data.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredData(filtered)
    }

    const triFunction = (region) => {
        const filtered1 = data.filter(country => 
            country.region.toLowerCase() === region.toLowerCase()
        )
        setFilteredData(filtered1)
    }

    return(
        <>
        <SearchBar onTri={triFunction} onSearch={handleSearch}/>

        <div className='container'>
         {filteredData && filteredData.map((item, index) => (      
            
                <div className='card-container' key={index}>
                    <div className='flag'>
                        <img src={item.flags.svg}></img>
                    </div>
                    <div className='infos'>
                        <h3>{item.name.common}</h3>
                        <p> <b>Population</b>: {item.population} </p>
                        <p> <b>Region</b>: {item.region}</p>
                        <p> <b>Capital</b>: {item.capital}</p>
                    </div>
                </div>  
         ))}
         </div>
        </>
    )
}