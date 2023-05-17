import { useState } from "react";
import { formRegister } from '../../utils/validation/formRegister'
import { registerUser } from "../../Redux/Actions/actions";
import { useDispatch } from "react-redux";
import style from './Register.module.css'
import perfilUser from '../../assert/perfilUser.png';


const Register = () => {
    const dispatch = useDispatch();

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        profileImage: null,
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
            profileImage: file,
        });
        setIsImageSelected(true); 
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        
        try {
            dispatch(registerUser(userData));
            console.log(userData);
        } catch (error) {
            console.error("Error", error.message);
        }
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

                <div className={`${style.imageContainer} ${style.imageContainerHover}`}>
                <input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {!userData.profileImage ? (
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
                        className={style.profileImage}
                        src={URL.createObjectURL(userData.profileImage)}
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
                        <label htmlFor="firstName">FirstName</label>
                        <div className={style.inputWrapper}>
                            <input 
                                id="firstName"
                                type="text" 
                                name="firstName"
                                placeholder="Type you firstName..."
                                value={userData.firstName}
                                onChange={handleChange}
                            
                            />
                        </div>
                            <div className={style.errorContainer}>
                                {errors.firstName && <div className={style.errorMessage}>{errors.firstName}</div>}
                            </div>
                    </div>


                    <div>
                        <label htmlFor="lastName">LastName</label>
                        <div>
                            <input 
                                id="lastName"
                                type="text" 
                                name="lastName"
                                placeholder="Type your lastName..."
                                value={userData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <div>{errors.lastName}</div> }
                        </div>
                    </div>


                    <div>
                        <label htmlFor="email">Email</label>
                        <div>
                            <input 
                                id="email"
                                type="email" 
                                name="email"
                                placeholder="Type your email..."
                                value={userData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div>{errors.email}</div> }
                        </div>
                    </div>


                    <div>
                        <label htmlFor="password">Password</label>
                        <div>
                            <input 
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Type your password..."
                                value={userData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div>{errors.password}</div> }
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="terms">    
                        <input
                        type="checkbox"
                        name="terms"
                        required
                        />I accept the terms and conditions
                        </label>
                </div>

                <button
                    type="submit"
                    disabled={isFormValid}
                >
                    Register
                </button>

            </form>
        </div>
    );
};

export default Register;