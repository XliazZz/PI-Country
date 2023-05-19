import Activity from '../Activity/Activity';
import style from './FavoriteActivity.module.css';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

const FavoriteActivity = () => {
    const loading = useSelector(state => state.loading);
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

    console.log(favs)

    return (
        <div>
            {favs?.map(activity => (
                <Activity 
                key={activity.id}
                id={activity.id}
                name={activity.name}
                difficulty={activity.difficulty}
                duration={activity.duration}
                season={activity.season}
                />
            ))}
            </div>
        );
};

export default FavoriteActivity;