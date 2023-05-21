import { useState, useEffect  } from 'react';
import { useDispatch } from "react-redux";
import { postFavoriteActivity, deleteFavoriteActivity } from "../../Redux/Actions/actions";
import axios from "axios";
import style from './Activity.module.css'
import summer from '../../assert/Season/summer.jpg';
import spring from '../../assert/Season/spring.jpg';
import autumn from '../../assert/Season/autumn.jpg';
import winter from '../../assert/Season/winter.jpg';
import seasons from '../../assert/Season/seasons.jpg';

const Activity = ({ id, name, difficulty, duration, season, countries }) => {
    const dispatch = useDispatch();
    const [isFav, setIsFav] = useState(false);

    const handleFavorite = () => {
        if (isFav) {
            setIsFav(false);
            dispatch(deleteFavoriteActivity(id));
        } else {
            setIsFav(true);
            dispatch(postFavoriteActivity({ id, name, difficulty, duration, season }));
        };
    };

    const [favs, setFavs] = useState([]);

    useEffect(() => {
        const allCountriesFav = async () => {
            try {
                const respose = await axios.get('http://localhost:3001/favactivity');
                const data = respose.data;
                setFavs(data)
            } catch (error) {
                throw new Error(`${error.message}`);
            }
        }
        allCountriesFav();
    }, [])

    useEffect(() => {
        favs?.forEach((fav) => {
            if (fav && fav.id === id) {
                setIsFav(true);
            }
            });
    }, [favs]);

    console.log(name)
    
    return(
        <div className={style.divPadre}>

                <button
                    className={style.buttonHeart}
                    onClick={handleFavorite}
                >
                    {isFav ? "❤️ " : "🤍"}
                </button>
                <img 
                    className={style.seasons}
                    src={
                        season === 'Summer' ? summer 
                        : season === 'Autumn' ? autumn 
                        : season === 'Winter' ? winter 
                        : season === 'Spring' ? spring 
                        : seasons
                    } 
                    alt="" 
                />
                <div className={style.textoActivity}>
                    <h3 className={style.h2Activity}>Difficulty: <span className={style.spanActivity}> {difficulty}</span></h3>
                    <h3 className={style.h2Activity}>Name: <span className={style.spanActivity}>{name}</span></h3>
                    <h3 className={style.h2Activity}>Season: <span className={style.spanActivity}>{season}</span></h3>
                    <h3 className={style.h2Activity}>Duration: <span className={style.spanActivity}>{duration}</span></h3>
                </div>
        </div>
    );
};

export default Activity;