import axios from 'axios';
import { SEARCH_COUNTRY_REQUEST, SEARCH_COUNTRY_SUCCESS, SEARCH_COUNTRY_ERROR,
    COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_ERROR, 
    ORDER_BY_LETTER, ORDER_BY_POPULATION,
    POST_ACTIVITY_REQUEST,
    POST_ACTIVITY_SUCCESS,
    POST_ACTIVITY_ERROR,
    POST_FAVORITE_COUNTRY_REQUEST,
    POST_FAVORITE_COUNTRY_SUCCESS,
    POST_FAVORITE_COUNTRY_ERROR,
    DELETE_FAVORITE_COUNTRY_REQUEST,
    DELETE_FAVORITE_COUNTRY_SUCCESS,
    DELETE_FAVORITE_COUNTRY_ERROR,
    POST_FAVORITE_ACTIVITY_REQUEST,
    POST_FAVORITE_ACTIVITY_SUCCESS,
    POST_FAVORITE_ACTIVITY_ERROR,
    DELETE_FAVORITE_ACTIVITY_REQUEST,
    DELETE_FAVORITE_ACTIVITY_SUCCESS,
    DELETE_FAVORITE_ACTIVITY_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
} from "../Action-Types/action-types";

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
        };
    };
};

//Order
export const orderByLetter = (order) => {
    return {
        type: ORDER_BY_LETTER,
        payload: order,
    };
};

export const orderByPopulation = (order) => {
    return {
        type: ORDER_BY_POPULATION,
        payload: order,
    };
};

//Post Activity
export const postActivityRequest = () => ({
    type: POST_ACTIVITY_REQUEST,
});

export const postActivitySuccess = ( activity ) => ({
    type: POST_ACTIVITY_SUCCESS,
    payload: activity,
});

export const postActivityError = ( error ) => ({
    type: POST_ACTIVITY_ERROR,
    payload: error,
});

export const postActivity = (activity) => {
    return async (dispatch) => {
        dispatch(postActivityRequest());
        const endpoint = 'http://localhost:3001/activity';
        try {
            const { data } = await axios.post(endpoint, activity);
            dispatch(postActivitySuccess(data));
        } catch (error) {
            dispatch(postActivityError(error.message))
        };
    };
};

//Post favorite country
export const postFavoriteCountryRequest = () => ({
    type: POST_FAVORITE_COUNTRY_REQUEST,
});

export const postFavoriteCountrySuccess = ( country ) => ({
    type: POST_FAVORITE_COUNTRY_SUCCESS,
    payload: country,
});

export const postFavoriteCountryError = ( error ) => ({
    type: POST_FAVORITE_COUNTRY_ERROR,
    payload: error,
});

export const postFavoriteCountry = (country) => {
    return async (dispatch) => {
        dispatch(postFavoriteCountryRequest());
        const endpoint = 'http://localhost:3001/fav';
        try {
            const { data } = await axios.post(endpoint, country);
            dispatch(postFavoriteCountrySuccess(data));
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            dispatch(postFavoriteCountryError(errorMessage));
        };
    };
};


//Delete favorite country
export const deleteFavoriteCountryRequest = () => ({
    type: DELETE_FAVORITE_COUNTRY_REQUEST,
});

export const deleteFavoriteCountrySuccess = (id) => ({
    type: DELETE_FAVORITE_COUNTRY_SUCCESS,
    payload: id,
});

export const deleteFavoriteCountryError = ( error ) => ({
    type: DELETE_FAVORITE_COUNTRY_ERROR,
    payload: error,
});

export const deleteFavoriteCountry = (id) => {
    return async (dispatch) => {
        dispatch(deleteFavoriteCountryRequest());
        const endpoint = `http://localhost:3001/fav/${id}`;
        try {
            const { data } = await axios.delete(endpoint);
            dispatch(deleteFavoriteCountrySuccess(data));
        } catch (error) {
            dispatch(deleteFavoriteCountryError(error.message));
        };
    };
};


//Post favorite activity
export const postFavoriteActivityRequest = () => ({
    type: POST_FAVORITE_ACTIVITY_REQUEST,
});

export const postFavoriteActivitySuccess = ( activity ) => ({
    type: POST_FAVORITE_ACTIVITY_SUCCESS,
    payload: activity,
});

export const postFavoriteActivityError = ( error ) => ({
    type: POST_FAVORITE_ACTIVITY_ERROR,
    payload: error,
});

export const postFavoriteActivity = (activity) => {
    return async (dispatch) => {
        dispatch(postFavoriteActivityRequest());
        const endpoint = 'http://localhost:3001/favactivity';
        try {
            const { data } = await axios.post(endpoint, activity);
            dispatch(postFavoriteActivitySuccess(data));
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message;
            dispatch(postFavoriteActivityError(errorMessage));
        };
    };
};

//Delete favorite activity
export const deleteFavoriteActivityRequest = () => ({
    type: DELETE_FAVORITE_ACTIVITY_REQUEST,
});

export const deleteFavoriteActivitySuccess = (id) => ({
    type: DELETE_FAVORITE_ACTIVITY_SUCCESS,
    payload: id,
});

export const deleteFavoriteActivityError = ( error ) => ({
    type: DELETE_FAVORITE_ACTIVITY_ERROR,
    payload: error,
});

export const deleteFavoriteActivity = (id) => {
    return async (dispatch) => {
        dispatch(deleteFavoriteActivityRequest());
        const endpoint = `http://localhost:3001/favactivity/${id}`;
        try {
            const { data } = await axios.delete(endpoint);
            dispatch(deleteFavoriteActivitySuccess(data));
        } catch (error) {
            dispatch(deleteFavoriteActivityError(error.message));
        };
    };
};

//Register
export const registerRequest = () => {
    return {
        type: REGISTER_REQUEST,
    };
};

export const registerSuccess = (data) => {
    return {
        type: REGISTER_SUCCESS,
        payload: data,
    };
};

export const registerFailure = (error) => {
    return {
        type: REGISTER_FAILURE,
        payload: error,
    };
};

export const registerUser = (userData) => {
    return async (dispatch) => {
        try {
            dispatch(registerRequest());
            const endpoint = 'http://localhost:3001/user';
            const response = await axios.post(endpoint, userData);
            dispatch(registerSuccess(response.data));
        } catch (error) {
            dispatch(registerFailure(error.message));
        }
        };
};