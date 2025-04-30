import { Link, useNavigate } from 'react-router-dom';
import '../css/SignUpForm.css'
import { IoIosArrowBack } from "react-icons/io";
import { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas/signUpSchema';
import axios from "axios";
import { toast } from 'react-toastify';


const SignupForm = () => {
    // toast.success("Signup Successful");

    const [passwordShowSignUp, setPasswordShowSignUp] = useState({
        password: false,
        confirmPassword: false
    });
    const valuesInitial = {
        // firstName: '',
        firstName: '',
        lastName: '',
        emailName: '',
        emailPassword: '',
        emailConfirmPassword: '',
        gender: '',
        emailDob: '',
        address: '',
        title: '',
        phone: '',

    };

    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken && refreshToken.trim() !== "") {
            navigate("/");
        }
    })
    const { values, handleSubmit, handleBlur, handleChange, errors, touched } = useFormik({
        initialValues: valuesInitial,
        validationSchema: signUpSchema,

        onSubmit: async (values, action) => {


            // console.log(values);
            try {
                // const response = await axios.post("http://localhost:5000/api/signup", values, {
                await axios.post("http://localhost:5000/api/auth/signup", values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // console.log("Signup Success:", response.data);
                toast.success("Registered Successfully");
                action.resetForm();

                // Optional: Add success handling
                // alert("Signup successful!");
                // redirect to another page if needed

            } catch (error) {
                // console.error("Signup Error:",
                //     error.response?.data?.message ||
                //     error.response?.data ||
                //     error.message
                // );
                // toast.error(`invalid data`);
                toast.error(`${error.response?.data?.message ||
                    error.response?.data ||
                    error.message}`);

            }
        },
    });

    //  Auto-show error toasts when validation fails
    // useEffect(() => {
    //     Object.entries(errors).forEach(([key, value]) => {
    //         if (touched[key]) {
    //             toast.error(value);
    //         }
    //     });
    // }, [errors, touched]);


    // variable assigning for ease functionality
    let passwordSignup = passwordShowSignUp.password;
    let passwordConfirmSignup = passwordShowSignUp.confirmPassword;

    // function to handle boolean values of password show hide
    function handlePasswordShow(field) {
        setPasswordShowSignUp((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    }




    return (
        <>
            <div className="signupPage-outer-container">
                <div className="signupPage-image-container">

                </div>


                <div className="signupPage-form-container">
                    <div className='signupPage-back'>
                        <Link to='/login' className='loginLink'>
                            <IoIosArrowBack style={{ color: '#8692A6' }} /> <p>Back</p>
                        </Link>
                    </div>
                    <div className='SignupForm-outer-container-desgin'>
                        <form onSubmit={handleSubmit}>
                            <h3>Account Signup</h3>
                            <p>Become a member and enjoy exclusive promotions.</p>

                            <div className='formfield-inputDiv fullNameDiv'>
                                <label htmlFor="username-firstName">First Name</label><br />
                                <input
                                    type="text"
                                    id="username-fullName" className='inputUserDetails fullName' name="firstName"
                                    onChange={handleChange}
                                    value={values.firstName}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>{errors.firstName && touched.firstName ? errors.firstName : null}</p>}
                            </div>
                            <div className='formfield-inputDiv lastNameDiv'>
                                <label htmlFor="username-lastName">Last Name</label><br />
                                <input
                                    type="text"
                                    id="username-lastName" className='inputUserDetails lastName' name="lastName"
                                    onChange={handleChange}
                                    value={values.lastName}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>{errors.lastName && touched.lastName ? errors.lastName : null}</p>}
                            </div>

                            <div className='formfield-inputDiv emailNameDiv'>
                                <label htmlFor="username-email">Email address</label><br />
                                <input
                                    type="email"
                                    id="username-email" className='inputUserDetails emailName' name="emailName"
                                    onChange={handleChange}
                                    value={values.emailName}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>
                                    {errors.emailName && touched.emailName ? errors.emailName : null}</p>}
                            </div>

                            <div className='formfield-inputDiv emailPasswordDiv'>
                                <label htmlFor="password-email">Password</label><br />
                                <div className='emailSignUp-password-div'>
                                    <input
                                        type={passwordSignup ? "text" : "password"}
                                        id="password-email"
                                        className='inputUserDetails emailPassword'
                                        name="emailPassword"
                                        onChange={handleChange}
                                        value={values.emailPassword}
                                        onBlur={handleBlur}
                                    />

                                    {(passwordSignup) ?
                                        <FaEye
                                            className='eyePasswordIcon eyeNotSlash'
                                            onClick={() => handlePasswordShow("password")}
                                        />
                                        :
                                        <FaEyeSlash
                                            className='eyePasswordIcon eyeSlash'
                                            onClick={() => handlePasswordShow("password")}
                                        />
                                    }
                                </div>
                                {<p className='form-error'>
                                    {errors.emailPassword && touched.emailPassword ? errors.emailPassword : null}</p>}
                            </div>

                            <div className='formfield-inputDiv emailConfirmPasswordDiv'>
                                <label htmlFor="confirm-password-email">Confirm Password</label><br />
                                <div className='emailSignUp-password-div'>


                                    <input
                                        type={passwordConfirmSignup ? "text" : "password"}
                                        id="confirm-password-email" className='inputUserDetails emailConfirmPassword' name="emailConfirmPassword"
                                        onChange={handleChange}
                                        value={values.emailConfirmPassword}
                                        onBlur={handleBlur}

                                    />

                                    {(passwordConfirmSignup) ?
                                        <FaEye
                                            className='eyePasswordIcon eyeNotSlash'
                                            onClick={() => handlePasswordShow("confirmPassword")}
                                        />
                                        :
                                        <FaEyeSlash
                                            className='eyePasswordIcon eyeSlash'
                                            onClick={() => handlePasswordShow("confirmPassword")}
                                        />
                                    }
                                </div>
                                {<p className='form-error'>
                                    {errors.emailConfirmPassword && touched.emailConfirmPassword ? errors.emailConfirmPassword : null}
                                </p>}
                            </div>

                            <div className='formfield-inputDiv emailGenderDiv'>
                                <label htmlFor="emailGender">Gender</label><br />
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.gender === "male"}
                                    id="maleEmail" />
                                <label htmlFor="maleEmail">Male</label> &nbsp; &nbsp;
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.gender === "female"}
                                    id="femaleEmail" />

                                <label htmlFor="femaleEmail">Female</label><br />
                                {<p className='form-error'>
                                    {errors.gender && touched.gender ? errors.gender : null}</p>}
                            </div>

                            <div className='formfield-inputDiv emailDobDiv'>
                                <label htmlFor="dob-email">Date of Birth</label><br />
                                <input
                                    type="date"
                                    id="dob-email"
                                    className='inputUserDetails emailDob'
                                    name="emailDob"
                                    onChange={handleChange}
                                    value={values.emailDob}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>
                                    {errors.emailDob && touched.emailDob ? errors.emailDob : null}
                                </p>}
                            </div>
                            <div className='formfield-inputDiv addressDiv'>
                                <label htmlFor="username-address">Address</label><br />
                                <input
                                    type="text"
                                    id="username-address" className='inputUserDetails address' name="address"
                                    onChange={handleChange}
                                    value={values.address}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>{errors.address && touched.address ? errors.address : null}</p>}
                            </div>

                            <div className='formfield-inputDiv phoneDiv'>
                                <label htmlFor="username-title">Phone Number</label><br />
                                <input
                                    type="text"
                                    id="username-phone" className='inputUserDetails phone' name="phone"
                                    onChange={handleChange}
                                    value={values.phone}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>{errors.phone && touched.phone ? errors.phone : null}</p>}
                            </div>
                            <div className='formfield-inputDiv titleDiv'>
                                <label htmlFor="username-title">Job Title</label><br />
                                <input
                                    type="text"
                                    id="username-title" className='inputUserDetails title' name="title"
                                    onChange={handleChange}
                                    value={values.title}
                                    onBlur={handleBlur}
                                />
                                {<p className='form-error'>{errors.title && touched.title ? errors.title : null}</p>}
                            </div>
                            <button type="submit">Sign up</button><br /><br />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupForm
