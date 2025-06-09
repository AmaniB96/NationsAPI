import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './details.css';
import axios from "axios";

export default function Details() {
    const [country, setCountry] = useState(null);
    const [borderCountries, setBorderCountries] = useState([]);
    const { name } = useParams();

    useEffect(() => {
        axios.get("https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,borders,languages,currencies,subregion,cca3")
            .then((response) => {
                const currentCountry = response.data.find(c => 
                    c.name.common.toLowerCase() === name.toLowerCase()
                );
                setCountry(currentCountry);
                
                // Get border countries
                const borders = currentCountry.borders || [];
                const borderData = response.data.filter(c => borders.includes(c.cca3));
                setBorderCountries(borderData);
            })
            .catch((error) => console.log(error));
    }, [name]);

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
                        <div className="country-header">
                            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="country-flag"/>
                            <h1>{country.name.common}</h1>
                        </div>
                        
                        <div className="info-grid">
                            <div className="info-card">
                                <h3>Basic Information</h3>
                                <div className="info-content">
                                    <p><span>Official Name:</span> {country.name.official}</p>
                                    <p><span>Capital:</span> {country.capital}</p>
                                    <p><span>Region:</span> {country.region}</p>
                                    <p><span>Subregion:</span> {country.subregion}</p>
                                </div>
                            </div>

                            <div className="info-card">
                                <h3>Demographics</h3>
                                <div className="info-content">
                                    <p><span>Population:</span> {country.population.toLocaleString()}</p>
                                    <p><span>Languages:</span> {Object.values(country.languages || {}).join(', ')}</p>
                                    <p><span>Currencies:</span> {Object.values(country.currencies || {})
                                        .map(curr => `${curr.name} (${curr.symbol})`).join(', ')}</p>
                                </div>
                            </div>
                        </div>

                        {borderCountries.length > 0 && (
                            <div className="border-countries">
                                <h3>Border Countries</h3>
                                <div className="border-flags">
                                    {borderCountries.map((border, i) => (
                                        <Link 
                                            key={i} 
                                            to={`/country/${border.name.common}`} 
                                            className="border-flag-container"
                                            title={border.name.common}
                                        >
                                            <img 
                                                src={border.flags.svg} 
                                                alt={`Flag of ${border.name.common}`}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="loading">Loading country details...</div>
            )}
        </>
    );
}