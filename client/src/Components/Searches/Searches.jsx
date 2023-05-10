import { useSelector, useDispatch } from "react-redux";
import { searchCountries } from "../../Redux/Actions/actions";
import { useEffect } from "react";
import Country from "../Country/Country";

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
        <div>
            {loading ? <p>Loading...</p> : null}
            {success ? <p>success...</p> : null}
            {error ? <p>error...</p> : null}
            {
                searchResults[searchResults.length - 1]?.map((country, index) => {
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
                })
            }
        </div>
    )
};

export default Searches;