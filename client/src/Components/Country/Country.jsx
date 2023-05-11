import { NavLink } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import style from './Country.module.css';
import Modal from '../Modal/Modal';
import DetailCountry from '../DetailCountry/DetailCountry'

const Country = ({ id, name, flags, continents, capital, subregion, area, population }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    console.log(isOpen);

    const onClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        const body = document.querySelector('body');
        if (isOpen) {
            body.classList.add(style.noScroll);
        } else {
            body.classList.remove(style.noScroll);
        }
    }, [isOpen]);

    return(
        <div className={style.container}>
            <div className={style.card} onClick={toggleModal}>
                <img className={style.imagen} src={flags} alt={name} />
                <div className={style.intro}>
                    <h1>{name}</h1>
                    <p>{capital}</p>
                    <p>{continents}</p>
                </div>
            </div>
            {
            isOpen && <Modal isOpen={isOpen}>
                <button className={style.closeButton} onClick={onClose}>X</button>
                <DetailCountry id={id} />
            </Modal>
            }

        </div>
    )
};

export default Country;