import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
                <div className="details-container">
                    <h1>{country.name.common}</h1>
                    <div className="product-details-grid">
                        <div className="product-image-section">
                            <img src={country.flags.svg} />
                        </div>
                        <div className="product-info-section">
                            {/* <p className="product-category">Category: {country.category}</p>
                            <p className="product-description-details">{country.description}</p>
                            <p className="product-price-details">Price: ${country.price}</p>
                            {country.rating && (
                                <p className="product-rating-details">
                                    Rating: {country.rating.rate} ({country.rating.count} reviews)
                                </p>
                            )} */}
                        </div>
                    </div>
                </div>
            ) : (
                <div>Loading product details...</div>
            )}
        </>
    );
}