import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { NavLink } from "react-router-dom"
import formLogin from "../../utils/validation/formLogin";
import style from './Login.module.css'

const Login = ({ login }) => {

    const [errors, setErrors] = useState({})
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        setErrors(formLogin({
            ...userData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        login(userData);
    }   

    
    const isFormValid =
    !userData.email ||
    !userData.password ||
    Object.values(errors).some((error) => error.length > 0);

    return (
        <div className={style.contenedorDiv}>

            <form onSubmit={handleSubmit} className={style.contenedorForm}>
            <NavLink  to="/">
            <button className={style.backForm}><BiArrowBack /></button>
            </NavLink>

            <div className={style.inputsLabel}>
                <div className={style.divLI}>
                    <label className={style.labelLogin} htmlFor="email">Email</label>
                    <div>
                        <input
                            id="email"
                            name="email" 
                            type="email"
                            placeholder="Type your email..."
                            value={userData.email} 
                            className={style.inputLogin}
                            onChange={handleChange}  
                        />
                    </div>
                    <div className={style.errorContainer}>
                            {errors.email && <span className={style.errorMessage}>{errors.email}</span>}
                    </div>
                </div>

                <div  className={style.divLI}>
                    <label className={style.labelLogin} htmlFor="password">Password</label>
                    <div>
                        <input 
                            id="password"
                            name="password"
                            value={userData.password}
                            className={style.inputLogin}
                            type="password"
                            placeholder="Type your password..."
                            onChange={handleChange} 
                        />
                    </div>
                    <div className={style.errorContainer}>
                            {errors.password && <span className={style.errorMessage}>{errors.password}</span>}
                    </div>
                </div>
            </div>
            <div className={style.divSubmit}>
                <button
                    type="submit"
                    disabled={isFormValid}
                    className={style.botonForm}
                >
                    Login
                </button>
            </div>
            <div className={style.RegisterNow}>
                <span>Do you not have an account?  
                <NavLink className={style.navLink} to={'/register'}>  
                    Register now
                </NavLink>
                    </span>
            </div>
            </form>
        </div>
    );
};

export default Login;