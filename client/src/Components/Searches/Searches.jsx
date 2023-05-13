import { useSelector, useDispatch } from "react-redux";
import { searchCountries } from "../../Redux/Actions/actions";
import { useEffect } from "react";
import Country from "../Country/Country";
import CountryLoading from "../CountryLoading/CountryLoading";
import style from './Searches.module.css'

const Searches = ({ match }) => {
    const dispatch = useDispatch(); 

    const searchResults = useSelector(state => state.searchResults);
    const loading = useSelector(state => state.loading);
    const success = useSelector(state => state.success);
    const error = useSelector(state => state.error);

    useEffect(() => {
        dispatch(searchCountries(match))
    }, [dispatch, match])

    console.log(searchResults)

    return (
        <div className={style.contenedorCountries}>
            {
                searchResults[searchResults.length - 1]?.map((country, index) => {
                    if(loading) {
                        return <CountryLoading key={index}/>
                    } else {
                        return (
                            <Country 
                            key={index}
                            id={country.id}
                            name={country.name}
                            flags={country.flags}
                            continents={country.continents}
                            capital={country.capital}
                            population={country.population}
                            />
                        )
                    }
                })
            }
        </div>
    )
};

export default Searches;