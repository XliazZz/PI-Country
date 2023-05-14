import { useState, useEffect } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { postActivity, getAllCountries } from '../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { formActivity } from '../../utils/validation/formActivity'
import style from './FormActivity.module.css'
import summer from '../../assert/Season/summer.jpg';
import spring from '../../assert/Season/spring.jpg';
import autumn from '../../assert/Season/autumn.jpg';
import winter from '../../assert/Season/winter.jpg';
import countries from '../../assert/Season/countries.jpg';

const FormActivity = () => {

    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries);

    //Errors
    const [errors, setErrors] = useState({});

    //ActivityData
    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch])

    const [selectedCountries, setSelectedCountries] = useState([]);

    const [activityData, setActivityData] = useState({
        name: '',
        difficulty: 0,
        duration: 0,
        season: '',
        selectedCountries,
    });
    
    const handleChange = (event) => {
        setActivityData({
            ...activityData,
            [event.target.name]: event.target.value
        });
        setErrors(formActivity({
            ...activityData,
            [event.target.name]: event.target.value
        }));
    };
    
    //Funcion para elegir y setear la dificultad por medio de los botones.
    const handleDifficulty = (difficulty) => {
        setActivityData({
            ...activityData,
            difficulty: difficulty,
        });
    };

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
    
    const handleCountryDelete = (countryId) => {
        const updatedSelectedCountries = selectedCountries.filter(
                (country) => country.id !== countryId
            );
            setSelectedCountries(updatedSelectedCountries);
            setActivityData({
                ...activityData,
                selectedCountries: updatedSelectedCountries,
            });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(postActivity(activityData));
    };
    
    return(
        <div>
            <img src={activityData.season === 'Summer' ? summer : activityData.season === 'Autumn' ? autumn : activityData.season === 'Winter' ? winter : activityData.season === 'Spring' ? spring : countries} alt="" />

            <form action="">

                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                    type="text"
                    name='name'
                    placeholder='Enter name activity'
                    value={activityData.name} 
                    onChange={handleChange}
                    />
                </div>
                {errors.name && <div className={style.error}>{errors.name}</div>}


                <div>
                    <label htmlFor="difficulty">Difficulty</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((difficulty) => (
                        <button
                            key={difficulty}
                            type='button'
                            onClick={() => handleDifficulty(difficulty)}
                        >
                            {difficulty <= activityData.difficulty ? <AiFillStar /> : <AiOutlineStar />}
                        </button>
                        ))}
                    </div>
                </div>
                {errors.difficulty && <div className={style.error}>{errors.difficulty}</div>}


                <div>
                    <label htmlFor="duration">Duration</label>
                    <input 
                        type="number"
                        name="duration"
                        min="0"
                        step="15"
                        placeholder="Enter duration in minutes"
                        value={activityData.duration}
                        onChange={handleChange}
                    />
                </div>
                {errors.duration && <div className={style.error}>{errors.duration}</div>}

                
                <div>
                    <label htmlFor="season">Season</label>
                    <select 
                    name="season" 
                    id="season"
                    value={activityData.season}
                    onChange={handleChange}
                    >
                        <option value="">Select Season</option>
                        <option value="Summer">Summer</option>
                        <option value="Autumn">Autumn</option>
                        <option value="Winter">Winter</option>
                        <option value="Spring">Spring</option>
                    </select>
                </div>
                {errors.season && <div className={style.error}>{errors.season}</div>}


                <label htmlFor="selectedCountries">Choose country/countries:</label>
            <select
                className={style.selectCountries}
                name="selectedCountries"
                multiple
                value={selectedCountries.map(country => country.id)}
                onChange={handleCountrySelect}
            >
                {allCountries.map((country) => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
            {errors.selectedCountries && <div className={style.error}>{errors.selectedCountries}</div>}
            <h4>
                You selected:{' '}
                {selectedCountries.map((country) => (
                    <span key={country.id}>
                    
                    <button
                        type="button"
                        onClick={() => handleCountryDelete(country.id)}
                    >
                        {country.name}
                    </button>
                    </span>
                ))}
            </h4>
            <button onClick={handleSubmit}>Submit</button>

            </form>
        </div>
    )
}

export default FormActivity;