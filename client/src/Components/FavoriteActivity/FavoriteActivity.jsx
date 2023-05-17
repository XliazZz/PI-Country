import { useSelector } from "react-redux";
import Activity from '../Activity/Activity';
import style from './FavoriteActivity.module.css';

const FavoriteActivity = () => {
    const myFavoriteActivity = useSelector(state => state.myFavoriteActivity);
    const loading = useSelector(state => state.loading);
    
    console.log(myFavoriteActivity)
    
    return(
        <div>
            {
                myFavoriteActivity?.map(activity => {
                    <Activity 
                        key={activity.id}
                        id={activity.id}
                        name={activity.name}
                        difficulty={activity.difficulty}
                        duration={activity.duration}
                        season={activity.season}
                    />
                })
            }
        </div>
    )
};

export default FavoriteActivity;