import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './details.css';
import axios from "axios";

export default function Details() {
    const [country, setCountry] = useState(null);
    const { index } = useParams();

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((response) => {
                setCountry(response.data[index]);
            })
            .catch((error) => console.log(error));
    }, [index]);

    return (
        <>
            {country ? ( 
                <div 
                    className="details-container"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${country.flags.svg})`,
                    }}
                >
                    <Link to="/" className="back-button">← Back</Link>
                    <div className="country-details">
                        <h1>{country.name.common}</h1>
                        <div className="info-grid">
                            <div className="info-section">
                                <h3>Official Name</h3>
                                <p>{country.name.official}</p>

                                <h3>Capital</h3>
                                <p>{country.capital}</p>

                                <h3>Region</h3>
                                <p>{country.region} ({country.subregion})</p>
                            </div>

                            <div className="info-section">
                                <h3>Population</h3>
                                <p>{country.population.toLocaleString()}</p>

                                <h3>Languages</h3>
                                <p>{Object.values(country.languages || {}).join(', ')}</p>

                                <h3>Currencies</h3>
                                <p>
                                    {Object.values(country.currencies || {})
                                        .map(curr => `${curr.name} (${curr.symbol})`)
                                        .join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loading">Loading country details...</div>
            )}
        </>
    );
}