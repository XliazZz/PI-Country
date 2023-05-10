import style from './Footer.module.css'
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

const Footer = () => {
    return(
        <footer className={style.footer}>
            <div className={style['footer-content']}>

                <div className={style['footer-section']}>
                <h3 className={style.h3Footer}>About us</h3>
                <ul>
                    <li><a href="#">Globe Gazers</a></li>
                    <li><a href="#">About me</a></li>
                </ul>
                </div>


                <div className={style['footer-section']}>
                <h3>Contact us</h3>
                <ul>
                    <li><a href="#">martinezelias166@gmail.com</a></li>
                    <li><a href="#">+54-11-4888-4304</a></li>
                    <li><a href="#">Message</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
                </div>

                <div className={style['footer-section']}>
                <h3>Key Pages</h3>
                <ul>
                    <li><a href="#">Biggest countries</a></li>
                    <li><a href="#">Most population</a></li>
                    <li><a href="#">Countries</a></li>
                    <li><a href="#">Favorites</a></li>
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