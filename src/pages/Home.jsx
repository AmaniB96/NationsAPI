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
            <div key={index}>
                <img src={item.flags.png}></img>
            </div>
         ))}
        </>
    )
}