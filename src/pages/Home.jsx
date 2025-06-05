import { useEffect, useState } from 'react'
import './home.css'
import axios from 'axios'

export default function Home() {
    
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }, [])

    return(
        <>
         {data.map((item, index) => {
            <div key={index}>
                <img src={item[index].flags.png}></img>
            </div>
         })}
        </>
    )
}