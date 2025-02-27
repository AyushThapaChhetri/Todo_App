import { Link } from 'react-router-dom';
import '../css/SignUpForm.css'
import { IoIosArrowBack } from "react-icons/io";
import { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const SignupForm = () => {
    const [passwordShowSignUp, setPasswordShowSignUp] = useState({
        password: false,
        confirmPassword: false
    });
    const [signUpFormData, setSignUpFormData] = useState({
        fullName: "",
        emailName: "",
        emailPassword: "",
        emailConfirmPassword: "",
        gender: "",
        emailDob: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setSignUpFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

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
                        <form>
                            <h3>Account Signup</h3>
                            <p>Become a member and enjoy exclusive promotions.</p>

                            <label htmlFor="fullName">Full Name</label><br /><br />
                            <input
                                type="text"
                                id="username-fullName" className='inputUserDetails fullName' name="fullName"
                                onChange={handleChange}
                                required />
                            <br /><br />

                            <label htmlFor="email">Email address</label><br /><br />
                            <input
                                type="email"
                                id="username-email" className='inputUserDetails emailName' name="emailName"
                                onChange={handleChange}
                                required />
                            <br /><br />

                            <label htmlFor="emailPassword">Password</label><br /><br />
                            <div className='emailSignUp-password-div'>
                                <input
                                    type={passwordSignup ? "text" : "password"}
                                    id="password-email"
                                    className='inputUserDetails emailPassword'
                                    onChange={handleChange}
                                    name="emailPassword"
                                    required />

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
                            </div><br /><br />

                            <label htmlFor="emailConfirmPassword">Confirm Password</label><br /><br />
                            <div className='emailSignUp-password-div'>


                                <input
                                    type={passwordConfirmSignup ? "text" : "password"}
                                    id="confirm-password-email" className='inputUserDetails emailConfirmPassword' name="emailConfirmPassword"
                                    onChange={handleChange}
                                    required
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
                            <br /><br />

                            <label htmlFor="emailGender">Gender</label><br /><br />
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleChange}
                                id="maleEmail" />
                            <label htmlFor="genderMaleEmail">Male</label> &nbsp; &nbsp;
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleChange}
                                id="femaleEmail" />
                            <label htmlFor="genderFemaleEmail">Female</label><br /><br />

                            <label htmlFor="emailDob">Date of Birth</label><br /><br />
                            <input
                                type="date"
                                id="dob-email"
                                className='inputUserDetails emailDob'
                                name="emailDob"
                                onChange={handleChange}
                                required />
                            <br /><br />

                            <button type="submit">Sign up</button><br /><br />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupForm
