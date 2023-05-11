import { SEARCH_COUNTRY_ERROR, SEARCH_COUNTRY_REQUEST, SEARCH_COUNTRY_SUCCESS,
        COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_ERROR, 
        ORDER_BY_LETTER, ORDER_BY_POPULATION} from "../Action-Types/action-types";

const initialState = {
    error: null,
    loading: false,
    success: false,
    searchResults: [],
    allCountries: [],
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
            

        default: 
        return{...state};
    };
};

export default rootReducer;