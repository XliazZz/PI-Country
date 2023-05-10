import { SEARCH_COUNTRY_ERROR, SEARCH_COUNTRY_REQUEST, SEARCH_COUNTRY_SUCCESS,
        COUNTRY_REQUEST, COUNTRY_SUCCESS, COUNTRY_ERROR} from "../Action-Types/action-types";

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

        default: 
        return{...state};
    };
};

export default rootReducer;