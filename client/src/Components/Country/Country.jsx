import { useState, useEffect  } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteFavoriteCountry, postFavoriteCountry } from '../../Redux/Actions/actions';
import Modal from '../Modal/Modal';
import DetailCountry from '../DetailCountry/DetailCountry'
import style from './Country.module.css';

//ARREGLAR EL ANCHO DEL HOVER, AGGARRRA MAS DE LO NECESARIO

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

    const dispatch = useDispatch();
    const myFavorites = useSelector(state => state.myFavorites);
    const [isFav, setIsFav] = useState(false);

    const handleFavorite = () => {
        if (isFav) {
            setIsFav(false);
            dispatch(deleteFavoriteCountry(id));
        } else {
            setIsFav(true);
            dispatch(postFavoriteCountry({ id, name, flags, continents, capital, subregion, area, population }));
        };
    };

    useEffect(() => {
        myFavorites?.forEach((fav) => {
            if (fav && fav.id === id) {
                setIsFav(true);
            }
            });
    }, [myFavorites]);

    console.log(myFavorites)

    return(
        <div className={style.container}>
            <button
                onClick={handleFavorite}
            >
                "🤍"
            </button>
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