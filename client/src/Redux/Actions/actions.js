import axios from 'axios';
import { SEARCH_COUNTRY_REQUEST, SEARCH_COUNTRY_SUCCESS, SEARCH_COUNTRY_ERROR,
    COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_ERROR} from "../Action-Types/action-types";

// SearchBar
export const searchRequest = () => {
    return {
        type: SEARCH_COUNTRY_REQUEST,
    };
};

export const searchSuccess = (name) => {
    return {
        type: SEARCH_COUNTRY_SUCCESS, 
        payload: name,
    };
};

export const searchError = (error) => {
    return {
        type: SEARCH_COUNTRY_ERROR,
        payload: error,
    };
};

export const searchCountries = (name) => async (dispatch, getState) => {
    
    const { searchResults } = getState();
    const existingCountry = searchResults.find((country) => country.name === name);
    
    try {
        dispatch(searchRequest()); // Activar el estado de carga
        const response = await axios.get(`http://localhost:3001/countries/byName?name=${name}`);
        const data = response.data;
        dispatch(searchSuccess(data)); // Actualizar el estado con los datos de la búsqueda exitosa
    } catch (error) {
        dispatch(searchError(error.message)); // Actualizar el estado con el error de búsqueda
    }
};
//-------------------------------------------

//Home
export const countryRequest = () => ({
    type: COUNTRY_REQUEST,
});

export const countrySuccess = ( countries ) => ({
    type: COUNTRY_SUCCESS,
    payload: countries,
});

export const countryError = ( error ) => ({
    type: COUNTRY_ERROR,
    payload: error,
});

export const getAllCountries = () => {
    return async (dispatch) => {
        dispatch(countryRequest());

        try {
            const respose = await axios.get(`http://localhost:3001/countries`);
            const countries = respose.data;
            dispatch(countrySuccess(countries));
        } catch (error) {
            dispatch(countryError( error.message ))
        }
    }
}