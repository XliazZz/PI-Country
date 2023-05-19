import { useState, useEffect  } from 'react';
import { useDispatch } from "react-redux";
import { postFavoriteActivity, deleteFavoriteActivity } from "../../Redux/Actions/actions";
import axios from "axios";
import style from './Activity.module.css'

const Activity = ({ id, name, difficulty, duration, season }) => {
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
    
    return(
        <div>
            <button
                className={style.buttonHeart}
                onClick={handleFavorite}
            >
                {isFav ? "❤️ " : "🤍"}
            </button>
            <h3>{name}</h3>
            <h3>{difficulty}</h3>
            <h3>{season}</h3>
            <h3>{duration}</h3>
        </div>
    );
};

export default Activity;