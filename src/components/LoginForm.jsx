import { Link, useNavigate } from 'react-router-dom'
import '../css/LoginForm.css'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../schemas/loginSchema';
import { toast } from 'react-toastify';
// import axios from 'axios';
import api from '../utils/api';


// Custom Hook for Toast Error Notifications
// const FormErrorToasts = () => {
//     const { errors, touched } = useFormikContext();

//     useEffect(() => {
//         Object.entries(errors).forEach(([key, value]) => {
//             if (touched[key]) {
//                 toast.error(value);
//             }
//         });
//     }, [errors, touched]);

//     return null; // This component does not render anything
// };

const LoginForm = () => {
    const [passwordShowLogin, setPasswordShowLogin] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken && refreshToken.trim() !== "") {
            navigate("/");
        }
    })

    const initialValues = {
        emailName: "",
        emailPassword: "",
        emailRemember: false
    }



    return (
        <div className='loginForm-outer-container-desgin'>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={async (values, action) => {
                    // same shape as initial values
                    // console.log(values);
                    try {
                        const response = await api.post("/auth/login", values, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        // console.log("Login Success:", response.data);
                        // console.log("User Details:", response.data.user)
                        // console.log(response.data.token);
                        // const token = response.data.token;
                        // console.log(response.data.data)
                        const { accessToken, refreshToken } = response.data.data;

                        // console.log("Access Token: ", accessToken);
                        // console.log("Refresh Token: ", refreshToken);

                        // localStorage.setItem("authToken", token);
                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);
                        navigate('/');
                        toast.success("Logged In Successfully");
                        action.resetForm();



                    }
                    catch (error) {

                        toast.error(`${error.response?.data?.message ||
                            error.response?.data ||
                            error.message}`);

                    }
                }}

            >
                {() =>
                (
                    <Form>
                        {/*<FormErrorToasts /> Custom hook for error toasts */}
                        <h3>Account Login</h3>
                        <p>If you are already a member you can login with your email address and password.</p>

                        {/* Email Field */}
                        <label htmlFor="emailName">Email address</label><br />
                        <Field
                            type="email"
                            id="username-email"
                            className='inputUserDetails emailName'
                            name="emailName"
                        />
                        <div style={{ minHeight: "24px" }}>
                            <ErrorMessage name="emailName" component="p" className='form-error' />
                        </div>

                        {/* Password Field */}
                        <label htmlFor="emailPassword">Password</label><br />
                        <div className='email-password-div'>
                            <Field
                                type={(passwordShowLogin) ? "text" : "password"}
                                id="password-email"
                                className='inputUserDetails emailPassword'
                                name="emailPassword" />

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
                        <div style={{ minHeight: "24px" }}>
                            <ErrorMessage name="emailPassword" component="p" className='form-error' />
                        </div>
                        {/* Remember Me Checkbox */}
                        <div className='checkbox-Rememberme-login'>
                            <Field
                                type="checkbox" name="emailRemember" id="emailRemember" /><label htmlFor="emailRemember">Remember me</label>
                        </div>
                        <br />

                        <button type="submit">Login</button><br /><br />
                    </Form>
                )
                }
            </Formik>
            <p className='signUpInfo-para'>
                Dont have an account ? &nbsp;
                <Link to="/signup" className='signUpLink'>
                    <span className='login-sign-in'>
                        Sign up here
                    </span>
                </Link>
            </p>
        </div>
    )
}

export default LoginForm
