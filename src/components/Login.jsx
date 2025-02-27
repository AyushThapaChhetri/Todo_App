import '../css/Login.css'
import LoginForm from './LoginForm'
// import loginImage from '../assets/loginPageImage.svg';

const Login = () => {
    return (
        <div className="loginPage-outer-container">
            <div className="loginPage-image-container">

            </div>


            <div className="loginPage-form-container">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
