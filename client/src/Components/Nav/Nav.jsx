import Button from '../Button/Button';
import Button2 from '../Button2/Button2';
import SearchBar from '../SearchBar/SearchBar';
import style from './Nav.module.css';
import logo from '../../assert/logo.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

//HACER QUE NO SE PUEDA SELECCIONAR LA IMAGEN DEL LOGO, OSEA QUE NO SE PUEDA COPIAR APRENTADO CLICK
const Nav = () => {

    
    const { pathname } = useLocation();

    return(
        <nav className={style.navBar}>
            <img src={logo} alt={logo} />
            <NavLink to='/home'>
                <button className={style.botonHome}>Home</button>
            </NavLink>
            { pathname === '/' && <Button text='LOG IN'></Button>}
            { pathname === '/' && <Button2 text='CREATE YOUR ACTIVITY'></Button2>}
            { pathname !== '/' && <SearchBar />}
        </nav>
    )
};

export default Nav;