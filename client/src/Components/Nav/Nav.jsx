import Button from '../Button/Button';
import Button2 from '../Button2/Button2';
import SearchBar from '../SearchBar/SearchBar';
import style from './Nav.module.css';
import logo from '../../assert/logo.png'
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { RiLogoutBoxLine } from "react-icons/ri"

//HACER QUE NO SE PUEDA SELECCIONAR LA IMAGEN DEL LOGO, OSEA QUE NO SE PUEDA COPIAR APRENTADO CLICK
const Nav = ({ logOut }) => {
    const { pathname } = useLocation();
    const location = useLocation();

    return(
        <nav className={style.navBar}>


            <img src={logo} alt={logo} />
            <NavLink to={'/home'}>
                { pathname !== '/' && location.pathname !== "/login" && location.pathname !== "/register" &&  <button className={style.botonHome}>Home</button>}
            </NavLink>

            <NavLink to={'/activity'}>
                { pathname !== '/' && location.pathname !== "/login" && location.pathname !== "/register" && <button>Create your activity</button>}
            </NavLink>

            <NavLink to={'/favorites/country'}>
                { pathname !== '/' && location.pathname !== "/login" && location.pathname !== "/register" && <button>My favorites countries</button>}
            </NavLink>

            <NavLink to={'/favorites/activity'}>
                { pathname !== '/' && location.pathname !== "/login" && location.pathname !== "/register" && <button>My favorites activities</button>}
            </NavLink>
            
            <NavLink to={'/login'}>
                { pathname === '/' && location.pathname !== "/login"  && <Button text='LOG IN'></Button>}
            </NavLink>

            <NavLink to={'/register'}>
                { pathname === '/' && location.pathname !== "/login" && location.pathname !== "/register" && <Button2 text='CREATE YOUR ACTIVITY'></Button2>}
            </NavLink>

            { location.pathname !== "/" && location.pathname !== "/login" && location.pathname !== "/register" && (
            <NavLink to="/">
            <button className={style.logOut} onClick={logOut}>
                <RiLogoutBoxLine />
            </button>
            </NavLink>
            )}

            { pathname !== '/' && pathname !== '/login' && pathname !== '/register' && <SearchBar />}
        </nav>
    )
};

export default Nav;