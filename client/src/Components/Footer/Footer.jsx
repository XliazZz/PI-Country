import style from './Footer.module.css'
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return(
        <footer className={style.footer}>
            <div className={style['footer-content']}>

                <div className={style['footer-section']}>
                <h3 className={style.h3Footer}>About us</h3>
                <ul>
                    <li><NavLink to={'/register'}>Globe Gazers</NavLink></li>
                    <li><NavLink to={'/register'}>About me</NavLink></li>
                </ul>
                </div>


                <div className={style['footer-section']}>
                <h3>Contact us</h3>
                <ul>
                    <li>martinezelias166@gmail.com</li>
                    <li>+54-11-4888-4304</li>
                    <li><NavLink >Message</NavLink></li>
                    <li><NavLink >FAQ</NavLink></li>
                </ul>
                </div>

                <div className={style['footer-section']}>
                <h3>Key Pages</h3>
                <ul>
                    <li><NavLink >Biggest countries</NavLink></li>
                    <li><NavLink >Most population</NavLink></li>
                    <li><NavLink >Countries</NavLink></li>
                    <li><NavLink >Favorites</NavLink></li>
                </ul>
                </div>
                
                <div className={style['footer-section']}>
                <h3>Social Media</h3>
                <ul>
                    <li><a href="https://www.instagram.com/eliasx._" target="_blank" rel="noreferrer">Instagram <FaInstagram className={style.icono} /></a></li>
                    <li><a href="https://www.linkedin.com/in/elias-martinez-040980246/" target="_blank" rel="noreferrer" >Linkedin <FaLinkedin className={style.icono} /></a></li>
                    <li><a href="https://www.github.com/XliazZz" target="_blank" rel="noreferrer">GitHub  <FaGithub className={style.icono} /></a></li>
                </ul>
                </div>
            </div>
        </footer>
    )
};

export default Footer;