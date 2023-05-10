import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from 'axios';

const DetailCountry = () => {
    
    const { id } = useParams();
    const [country, setCountry] = useState({});
    
    useEffect(() => {
        const inEffect = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/countries/byId/${id}`) ;

                if(data.name) {
                    setCountry(data);
                } else {
                    throw new Error('Country not found')
                }
            } catch (error) {
                console.log("Country update in useeffect in component Detail", error);
            }
        }
        inEffect();
        return setCountry({});
    }, [id]);

    return(
        <div>
            <img src={country.flags} alt="" />
            <h1>{country.name}</h1>
            <h2>{country.id}</h2>
            <h2>{country.continents}</h2>
            <h2>{country.capital}</h2>
            <h2>{country.subregion}</h2>
            <h2>{country.area}</h2>
            <h2>{country.population}</h2>
            <h2>{country.activities}</h2>
        </div>
    )
}

export default DetailCountry;