import Country from '../Country/Country';
import ReactPaginate from 'react-paginate';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from '../../Redux/Actions/actions';
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries);
    const { pageNumber } = useParams(); // obtiene el número de página actual de la ruta
    const [ currentPage, setCurrentPage ] = useState(pageNumber ? pageNumber - 1 : 0);

    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch])

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        window.scrollTo(0, 0); // muestra la parte superior de la página
    }


    // número de elementos por página
    const itemsPerPage = 10;

    // calcula la sección de elementos para mostrar en la página actual
    const offset = currentPage * itemsPerPage;
    const currentItems = allCountries.slice(offset, offset + itemsPerPage);

    // calcula el número de páginas en función de la cantidad de elementos
    const pageCount = Math.ceil(allCountries.length / itemsPerPage);

    return (
        <div className={style.elCapo}>
            
            <div className={style.contenedorCountries}>
            {
                currentItems?.map(country => {
                    return (
                        <Country
                            key={country.id}
                            id={country.id}
                            name={country.name}
                            flags={country.flags}
                            continents={country.continents}
                            capital={country.capital}
                            population={country.population}
                        />
                    )
                })
            }
            
            </div>
            
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={style['pagination']}
                pageClassName={style['page-item']}
                pageLinkClassName={style['page-link']}
                previousClassName={currentPage === 0 ? style['page-item disabled'] : style['page-item']}
                previousLinkClassName={style['page-link']}
                nextClassName={currentPage === pageCount - 1 ? style['page-item disabled'] : style['page-item']}
                nextLinkClassName={style['page-link']}
                breakClassName={style['page-item']}
                breakLinkClassName={style['page-link']}
                activeClassName={style['active']}
                disabledClassName={style['disabled']}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                previousLabel={currentPage === 0 ? "" : "Back"}
                nextLabel={currentPage === pageCount - 1 ? "" : "Next"} // Agregar condición para mostrar el botón solo cuando no estás en la última página

            />

        </div>
    )
}

export default Home;
