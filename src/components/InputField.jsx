import "../Css/InputField.css";
import PropTypes from "prop-types";
import bhaktapurImg from '../assets/bhaktapuriph.jpg';
// import Output from './Output';
import Popup from "./Popup";
import { Link } from 'react-router-dom';
import api from "../utils/api";
import { useState } from "react";

const InputField = ({
    item,
    setItem,
    setIsFetch,
    searchField,
    setSearchField,
    isPopUpVisible,
    setPopUpVisible,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const handleAvatarClick = () => {
        setIsDropdownVisible(prev => !prev);
    };


    const handleButtonClick = () => {
        setPopUpVisible(!isPopUpVisible);
    };

    const logout = async () => {
        // console.log("Logout");
        // localStorage.removeItem("authToken");
        // localStorage.removeItem("refreshToken");
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (refreshToken) {
                // Send request to server to delete the refresh token
                await api.post("/auth/logout",
                    { refreshToken: refreshToken }
                    // {
                    //     headers: {
                    //         'Content-Type': 'application/json'
                    //     }
                    // }
                );
            }
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            // Always clear localStorage, even if the server request fails
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            console.log("Logout complete");
            // Optionally redirect the user or update the UI
        }
    }

    return (
        <>
            <div className="div-outerInput">
                <div className="div-innerInput">
                    <p className="inner-Title-input">TODO</p>
                    <div className="searchbarContainer">
                        <input
                            type="text"
                            id="userSearchInput"
                            className="searchField"
                            onChange={(e) => setSearchField(e.target.value)}
                            value={searchField}
                            placeholder="Search Todos Please"
                            required
                        />
                    </div>
                    <div className="buttons-avatar">
                        <button
                            type="button"
                            className="button-input"
                            onClick={handleButtonClick}
                        >
                            <span>
                                <b>+</b>&nbsp;&nbsp;New Project
                            </span>
                        </button>

                        <div className="div-input-profile-avatar"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleAvatarClick}
                        >
                            <img
                                src={bhaktapurImg}
                                alt="image"
                                className="image-avatar"
                            />
                        </div>
                        {(isHovered || isDropdownVisible) && (
                            <div className="dropdown-content"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <Link to="/editProfile" className='dropdown-avatar-edit'>
                                    Edit
                                </Link>
                                <Link to="/login" className='dropdown-avatar-logout' onClick={logout}>
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {isPopUpVisible && (
                    <>
                        <div className="popupBox-Wrapper">
                            <div className="popupBox">
                                <div className="popupBoxFormContainerImage"></div>
                                <div className="popupFormDataContainerInputField">
                                    <button
                                        type="button"
                                        onClick={handleButtonClick}
                                        className="closePopup"
                                    >
                                        X
                                    </button>
                                    <Popup
                                        item={item}
                                        setItem={setItem}
                                        setIsFetch={setIsFetch}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

// Prop validation
InputField.propTypes = {
    item: PropTypes.array.isRequired, // Assuming 'item' is an array
    setItem: PropTypes.func.isRequired, // Assuming 'setItem' is a function
    isPopUpVisible: PropTypes.bool.isRequired, // Assuming 'isPopUpVisible' is a boolean
    setPopUpVisible: PropTypes.func.isRequired, // Assuming 'setPopUpVisible' is a function
    searchField: PropTypes.string.isRequired,
    setSearchField: PropTypes.func.isRequired,
    setIsFetch: PropTypes.func.isRequired,
};

export default InputField;
