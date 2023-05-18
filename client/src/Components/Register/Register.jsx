import { useState } from "react";
import { formRegister } from '../../utils/validation/formRegister'
import { useDispatch } from "react-redux";
import style from './Register.module.css'
import perfilUser from '../../assert/perfilUser.png';
import { NavLink } from 'react-router-dom'
import { GrFormViewHide, GrFormView } from "react-icons/gr"
import { BiArrowBack } from "react-icons/bi";

//AGREGAR MENSAJE DE USUARIO CREADO CON EXITO!!!!!!!!!!!!!!!

const Register = () => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: null,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        setErrors(formRegister({
            ...userData,
            [event.target.name]:event.target.value
        }));
    };


    const [isImageSelected, setIsImageSelected] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setUserData({
            ...userData,
            image: file,
        });
        setIsImageSelected(true); 
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData()
        formData.append('firstName', userData.firstName)
        formData.append('lastName', userData.lastName)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('image', userData.image)

        fetch('http://localhost:3001/user', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => {
            console.log(err)
        })

        // try {
        //     dispatch(registerUser(userData));
        //     console.log(userData);
        // } catch (error) {
        //     console.error("Error", error.message);
        // }
    }



    const isFormValid =
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.password ||
    Object.values(errors).some((error) => error.length > 0);

    return(
        <div className={style.contenedorDiv}>
            <form  onSubmit={handleSubmit} className={style.contenedorForm}>

            <NavLink  to="/">
                <button className={style.backForm}><BiArrowBack /></button>
            </NavLink>

                <div className={`${style.imageContainer} ${style.imageContainerHover}`}>
                <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {!userData.image ? (
                    <div className={style.profileIcon}>
                        <img
                            className={style.perfilUser}
                            src={perfilUser}
                            alt="Default Profile Image"
                            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        />
                    </div>
                ) : (
                    <img
                        className={style.image}
                        src={URL.createObjectURL(userData.image)}
                        alt="Profile Image Preview"
                        style={{ width: "200px", height: "200px", borderRadius: "900px" }}
                    />
                )}
                {!isImageSelected && (
                    <div className={style.hoverText}>Profile picture</div>
                )}
                </div>

                <div className={style.inputsLabel}>
                    <div>
                        <label className={style.labelRegister} htmlFor="firstName">FirstName</label>
                        <div className={style.inputWrapper}>
                            <input 
                                className={style.inputRegister}
                                id="firstName"
                                type="text" 
                                name="firstName"
                                placeholder="Type you firstName..."
                                value={userData.firstName}
                                onChange={handleChange}
                            
                            />
                        </div>
                            <div className={style.errorContainer}>
                                {errors.firstName && <span className={style.errorMessage}>{errors.firstName}</span>}
                            </div>
                    </div>


                    <div>
                        <label  className={style.labelRegister} htmlFor="lastName">LastName</label>
                        <div>
                            <input 
                                className={style.inputRegister}
                                id="lastName"
                                type="text" 
                                name="lastName"
                                placeholder="Type your lastName..."
                                value={userData.lastName}
                                onChange={handleChange}
                            />
                            <div className={style.errorContainer}>
                                {errors.lastName && <span className={style.errorMessage}>{errors.lastName}</span> }
                            </div>
                        </div>
                    </div>


                    <div>
                        <label  className={style.labelRegister} htmlFor="email">Email</label>
                        <div>
                            <input 
                                className={style.inputRegister}
                                id="email"
                                type="email" 
                                name="email"
                                placeholder="Type your email..."
                                value={userData.email}
                                onChange={handleChange}
                            />
                            <div className={style.errorContainer}>
                                {errors.email && <span className={style.errorMessage}>{errors.email}</span> }
                            </div>
                        </div>
                    </div>


                    <div>
                        <label  className={style.labelRegister} htmlFor="password">Password</label>
                        <div>
                            <input 
                                className={style.inputRegister}
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Type your password..."
                                value={userData.password}
                                onChange={handleChange}
                            />
                            <div className={style.errorContainer}>
                                {errors.password && <span className={style.errorMessage}>{errors.password}</span> }
                            </div>
                            <button className={style.buttonShow} type="button" onClick={handleShowPassword}>{showPassword ? <GrFormView className={style.showOrNo} /> : <GrFormViewHide className={style.showOrNo} /> }</button>
                        </div>
                    </div>
                </div>

                <div className={style.termSubmit}>
                    <div>
                        <label htmlFor="terms">    
                            <input
                            className={style.terms}
                            type="checkbox"
                            name="terms"
                            required
                            />
                                <NavLink  className={style.navLink} to={'/terms'}>   
                                I accept the terms and conditions
                                </NavLink>
                            </label>
                    </div>

                    <button
                        className={style.submitRegister}
                        type="submit"
                        disabled={isFormValid}
                    >
                        Register
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Register;