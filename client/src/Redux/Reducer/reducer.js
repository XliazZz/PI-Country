import { SEARCH_COUNTRY_ERROR, SEARCH_COUNTRY_REQUEST, SEARCH_COUNTRY_SUCCESS,
        COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_ERROR, 
        ORDER_BY_LETTER, ORDER_BY_POPULATION,
        POST_ACTIVITY_ERROR, POST_ACTIVITY_REQUEST, POST_ACTIVITY_SUCCESS, POST_FAVORITE_COUNTRY_REQUEST, POST_FAVORITE_COUNTRY_SUCCESS, POST_FAVORITE_COUNTRY_ERROR, DELETE_FAVORITE_COUNTRY_REQUEST, DELETE_FAVORITE_COUNTRY_SUCCESS, DELETE_FAVORITE_COUNTRY_ERROR, POST_FAVORITE_ACTIVITY_REQUEST, POST_FAVORITE_ACTIVITY_SUCCESS, POST_FAVORITE_ACTIVITY_ERROR,
        REGISTER_REQUEST,
        REGISTER_SUCCESS,
        REGISTER_FAILURE,} from "../Action-Types/action-types";

const initialState = {
    error: null,
    loading: false,
    success: false,
    searchResults: [],
    allCountries: [],
    myFavorite: [],
    myFavoriteActivity: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){

        case SEARCH_COUNTRY_REQUEST: 
        return{
            ...state,
            loading: true,
            error: null,
            success: false,
        };
        case SEARCH_COUNTRY_SUCCESS: 
        return{
            ...state,
            searchResults: [...state.searchResults, action.payload],
            loading: false,
            error: null,
            success: true,
        };
        case SEARCH_COUNTRY_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            };

        case  COUNTRY_REQUEST:
            return{
                ...state,
                loading: true,
                error: false,
                success: false,
            };
        case COUNTRY_SUCCESS:
            return{
                ...state,
                loading: false,
                error: false,
                success: true,
                allCountries: action.payload,
            };
        case COUNTRY_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload,
                success: false,
            }

            case ORDER_BY_LETTER:
                const copyAllCountries = [...state.allCountries];
                return {
                    ...state,
                    allCountries: action.payload === "A"
                        ? copyAllCountries.sort((a, b) => a.name.localeCompare(b.name))
                        : copyAllCountries.sort((a,b) => b.name.localeCompare(a.name))
                };
            case ORDER_BY_POPULATION:
                const copyAllCountriesPopulation = [...state.allCountries];
                return {
                    ...state,
                    allCountries: action.payload === "D"
                        ? copyAllCountriesPopulation.sort((a, b) => a.population - b.population)
                        : copyAllCountriesPopulation.sort((a,b) => b.population - a.population)
                };
            
            case POST_ACTIVITY_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: false,
                    success: false,
                };
            case POST_ACTIVITY_SUCCESS:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    error: false,
                };
            case POST_ACTIVITY_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false,
                };

            case POST_FAVORITE_COUNTRY_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: false,
                    success: false,
                };
            case POST_FAVORITE_COUNTRY_SUCCESS:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    error: false,
                    myFavorite: action.payload,
                }
            case POST_FAVORITE_COUNTRY_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false,
                };

            case DELETE_FAVORITE_COUNTRY_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: false,
                    success: false,
                };
            case DELETE_FAVORITE_COUNTRY_SUCCESS:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    error: false,
                    myFavorite: action.payload,
                };
            case DELETE_FAVORITE_COUNTRY_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false,
                }

            
            case POST_FAVORITE_ACTIVITY_REQUEST:
                return {
                    ...state,
                    loading: true,
                    error: false,
                    success: false,
                };
            case POST_FAVORITE_ACTIVITY_SUCCESS:
                return {
                    ...state,
                    success: true,
                    loading: false,
                    error: false,
                    myFavoriteActivity: action.payload,
                }
            case POST_FAVORITE_ACTIVITY_ERROR:
                return {
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false,
                };

            case REGISTER_REQUEST:
                return{
                    ...state,
                    loading: true,
                    error: false,
                    success: false,
                };
    
            case REGISTER_SUCCESS:
                return{
                    ...state,
                    success: true,
                    loading: false,
                    error: false,
                };
    
            case REGISTER_FAILURE:
                return{
                    ...state,
                    error: action.payload,
                    loading: false,
                    success: false,
                };
                
        default: 
        return{...state};
    };
};

export default rootReducer;