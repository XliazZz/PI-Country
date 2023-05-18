import { useSelector } from "react-redux";
import Country from "../Country/Country";
import CountryLoading from "../CountryLoading/CountryLoading";
import style from './FavoriteCountry.module.css';

const FavoriteCountry = () => {
    const myFavorites = useSelector(state => state.myFavorites);
    const loading = useSelector(state => state.loading);
    console.log(myFavorites)
    return(
        <div>
            <div>
            {
                myFavorites?.map(country => {
                    if (loading) {
                        return <CountryLoading key={country.id} />
                    } else{
                        return (
                            <Country
                                key={country.id}
                                id={country.id}
                                name={country.name}
                                flags={country.flags}
                                continents={country.continents}
                                area={country.area}
                                subregion={country.sub}
                                capital={country.capital}
                                population={country.population}
                            />
                        )
                    }
                })
            }
            </div>
        </div>
    )
};

export default FavoriteCountry;