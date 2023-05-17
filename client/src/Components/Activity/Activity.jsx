import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { postFavoriteActivity, deleteFavoriteActivity } from "../../Redux/Actions/actions";


const Activity = ({ id, name, difficulty, duration, season }) => {

    const dispatch = useDispatch();
    const myFavoriteActivity = useSelector(state => state-myFavoriteActivity);
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

    useEffect(() => {
        myFavoriteActivity?.forEach((fav) => {
            if (fav && fav.id === id) {
                setIsFav(true);
            };
        });
    }, [myFavoriteActivity]);

    return(
        <div>
            <button
                onClick={handleFavorite}
            >
                🤍
            </button>
            <h3>{name}</h3>
            <h3>{difficulty}</h3>
            <h3>{season}</h3>
            <h3>{duration}</h3>
        </div>
    );
};

export default Activity;