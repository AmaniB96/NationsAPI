import { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'

export default function Home() {
    
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }, [])

    return(
        <>
         {data && data.map((item, index) => (            
            <div className='card-container' key={index}>
                <div className='flag'>
                    <img src={item.flags.png}></img>
                </div>
                <div className='infos'>
                    <h3>{item.name.common}</h3>
                    <p> <b>Population</b>: {item.population} </p>
                    <p> <b>Region</b>: {item.region}</p>
                    <p> <b>Capital</b>: {item.capital}</p>
                </div>
            </div>
         ))}
        </>
    )
}