import { Link } from 'react-router-dom'
import '../css/LoginForm.css'
import { FaEye } from "react-icons/fa";

import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';


const LoginForm = () => {
    const [passwordShowLogin, setPasswordShowLogin] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        emailName: "",
        emailPassword: ""
    });

    // console.log(loginFormData);
    function handleChange(e) {
        const { name, value } = e.target;
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    return (
        <div className='loginForm-outer-container-desgin'>
            <form>
                <h3>Account Login</h3>
                <p>If you are already a member you can login with your email address and password.</p>

                <label htmlFor="email">Email address</label><br /><br />
                <input type="email"
                    id="username-email"
                    className='inputUserDetails emailName'
                    onChange={handleChange}
                    name="emailName"
                    required />
                <br /><br />

                <label htmlFor="emailPassword">Password</label><br /><br />
                <div className='email-password-div'>
                    <input
                        type={(passwordShowLogin) ? "text" : "password"}
                        id="password-email"
                        className='inputUserDetails emailPassword'
                        name="emailPassword"
                        onChange={handleChange}
                        required

                    />

                    {(passwordShowLogin) ?
                        <FaEye
                            className='eyePasswordIcon eyeNotSlash'
                            onClick={() => {
                                setPasswordShowLogin((prev) => !prev);
                            }}
                        />
                        :
                        <FaEyeSlash
                            className='eyePasswordIcon eyeSlash'
                            // onClick={handleShowPasswordLogin}
                            onClick={() => {
                                setPasswordShowLogin((prev) => !prev);
                            }}
                        />
                    }

                </div>
                <br /><br />


                <input type="checkbox" name="emailRemember" id="emailRemember" /><label htmlFor="emailPassword">Remember me</label><br /><br />

                <button type="submit">Login</button><br /><br />

                <p>

                    Dont have an account ?
                    <Link to="/signup" className='signUpLink'>
                        <span className='login-sign-in'>
                            Sign up here
                        </span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginForm
