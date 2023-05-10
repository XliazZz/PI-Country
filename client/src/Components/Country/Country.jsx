import { NavLink } from 'react-router-dom';
import style from './Country.module.css';

const Country = ({ id, name, flags, continents, capital, subregion, area, population }) => {
    return(
        <div className={style.container}>
            <NavLink style={{ textDecoration: "none" }} to={`/detail/${id}`}>
                <div className={style.card}>
                    <img className={style.imagen} src={flags} alt={name} />
                    <div className={style.intro}>
                        <h1>{name}</h1>
                        <p>{capital}</p>
                        <p>{continents}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
};

export default Country;