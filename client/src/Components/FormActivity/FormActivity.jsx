import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { postActivity } from '../../Redux/Actions/actions';
import validationActivity from "../validation/validateActivityData";
import style from './FormActivity.module.css'
import summer from '../../assert/Season/summer.jpg'
import spring from '../../assert/Season/spring.jpg'
import autumn from '../../assert/Season/autumn.jpg'
import winter from '../../assert/Season/winter.jpg'
import countries from '../../assert/Season/countries.jpg'

const FormActivity = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries);
    const success = useSelector(state => state.success);
    const [formSubmitted, setFormSubmitted] = useState(false); // nueva variable de estado

    const [selectedCountries, setSelectedCountries] = useState([]);
    const [errors, setErrors] = useState({});
    const [activityData, setActivityData] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        selectedCountries: [],
    })
    

    const handleChange = (event) => {
        setActivityData({
            ...activityData,
            [event.target.name]: event.target.value
        })
        setErrors(validationActivity({
            ...activityData,
            [event.target.name]: event.target.value
        }))
    }

    const handleCountrySelect = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => {
            return {
                id: option.value,
                name: option.text
            }
        });
        
        const newSelectedCountries = selectedOptions.filter(option => {
            return !selectedCountries.some(country => country.id === option.id)
        })
        
        setSelectedCountries([...selectedCountries, ...newSelectedCountries]);
        
        setActivityData({
            ...activityData,
            selectedCountries: [...selectedCountries, ...newSelectedCountries],
        })
    };

    const handleCountryRemove = (countryId) => {
        const newSelectedCountries = selectedCountries.filter(
            (country) => country.id !== countryId
        );
        setSelectedCountries(newSelectedCountries);
        setActivityData({
            ...activityData,
            selectedCountries: newSelectedCountries
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postActivity(activityData));
        setFormSubmitted(true);
    } 

    const isFormValid =
    !activityData.name ||
    !activityData.difficulty ||
    !activityData.duration ||
    !activityData.season ||
    Object.values(errors).some((error) => error.length > 0);

    const [names, setNames] = useState([]);

    useEffect(() => {
        const fetchNames = async () => {
            try {
                const respose = await fetch('http://localhost:3001/countries/name');
                const data = await respose.json();
                setNames(data);
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        };

        fetchNames();
    }, [])


    
    return(
        <div className={style.divPadre}>
            <form className={style.contenedorFormActivity}>

                <div className={style.contenedorImg}>
                    <img className={style.imageSeason} src={activityData.season === 'Summer' ? summer : activityData.season === 'Autumn' ? autumn : activityData.season === 'Winter' ? winter : activityData.season === 'Spring' ? spring : countries} alt="season" />
                </div>

                <div className={style.contenedorGral}>
                    <label className={style.labelActivity} htmlFor="name">Name:</label>
                    <div className={style.inputContainer}>
                        <input    
                            className={style.inputActivity}
                            type="text" 
                            name="name" 
                            placeholder="Name your activity"
                            value={activityData.name}
                            onChange={handleChange}
                            disabled={formSubmitted} // agregar el atributo disabled aquí

                        />
                    {errors.name && <span className={style.errorActivity}>{errors.name}</span> } 
                </div>
                </div>

                <div className={style.contenedorGral}>
                    <label className={style.labelActivity} htmlFor="difficulty">Difficulty:</label>
                    <div className={style.inputContainer}>
                        <input 
                            className={style.inputActivity}
                            type="number" 
                            name="difficulty"
                            placeholder="Put the difficulty level"
                            value={activityData.difficulty}
                            onChange={handleChange}
                            disabled={formSubmitted} // agregar el atributo disabled aquí

                        />
                    {errors.difficulty && <span className={style.errorActivity}>{errors.difficulty}</span> } 
                    </div>
                </div>

                <div className={style.contenedorGral}>
                    <label className={style.labelActivity} htmlFor="duration">Duration/min:</label>
                    <div className={style.inputContainer}>
                        <input 
                            className={style.inputActivity}
                            type="number" 
                            name="duration"
                            placeholder="Put the duration(Min)"
                            value={activityData.duration}
                            onChange={handleChange}
                            disabled={formSubmitted} // agregar el atributo disabled aquí

                        />
                    {errors.duration && <span className={style.errorActivity}>{errors.duration}</span> }             
                    </div>
                </div>

                <div className={style.contenedorGral}>
                    <label className={style.labelActivity} htmlFor="season">Season:</label>
                    <div>
                        <select 
                        name="season" 
                        value={activityData.season} 
                        onChange={handleChange}
                        className={style.selectActivity}
                        disabled={formSubmitted} // agregar el atributo disabled aquí

                        >
                            <option value="">Select a season</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                        {errors.season && <span className={style.errorActivity}>{errors.season}</span> }             
                    </div>
                </div>

                <div className={style.contenedorGral}>
                    <label className={style.labelActivity} htmlFor="selectedCountries">Choose country/countries:</label>
                    <div className={style.contenedorCountries}>
                        <select
                            className={style.selectCountries}
                            name="selectedCountries"
                            multiple
                            value={selectedCountries.map((country) => country.id)}
                            onChange={handleCountrySelect}
                            disabled={formSubmitted} // agregar el atributo disabled aquí
                        >
                            {names.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                        {selectedCountries.map((country) => (
                            <div className={style.divButtonCountries} key={country.id}>

                                <button
                                disabled={formSubmitted}
                                type="button"
                                onClick={() => handleCountryRemove(country.id)}
                                >
                                {country.name}
                                </button>
                            </div>
                            ))}
                    </div>
                </div>
                
                { !formSubmitted && <button 
                disabled={isFormValid}
                onClick={handleSubmit}>Submit</button>}

                {success && formSubmitted && <h2>Activity added successfully!</h2>}

            </form>
        
        </div>
    )
};

export default FormActivity;
