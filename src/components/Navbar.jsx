
import "../Css/Navbar.css"
// import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
// import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import api from "../utils/api";


const Navbar = () => {
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
            {/* <div className='navs-outer'> */}
            <div className='navs'>
                <div className='navContainer upperBox'>
                    <nav>
                        <p className='tNavpara'>TODO</p>

                    </nav>
                </div>
                <div className='navContainer projectContainer'>
                    <button onClick={async () => {
                        const refreshToken = localStorage.getItem("refreshToken");
                        if (!refreshToken) {
                            console.log("No refresh token found");
                            return;
                        }

                        try {
                            const { data } = await api.post("/auth/refresh", { refreshToken });
                            console.log("New tokens:", data);

                            localStorage.setItem("accessToken", data.data.accessToken);
                            localStorage.setItem("refreshToken", data.data.refreshToken);
                        } catch (error) {
                            console.error("Refresh failed", error);
                            localStorage.removeItem("accessToken");
                            localStorage.removeItem("refreshToken");
                            window.location.href = "/login"; // Redirect to login on failure
                        }
                    }}>Test Refresh</button>
                    <div className='navSettings'>


                        {/* <div className='navIcon logoutIcon'>
                            <IoIosLogOut className="nviconLogout" />
                        </div> */}
                        <div className="logout" onClick={logout}>

                            <div className='navIcon settingIcon'>
                                <Link to="/login" className='loginLink'>
                                    <IoIosLogOut className="nvicon" />
                                </Link>
                            </div>


                            <div className='navCaption setCap'>
                                <Link to="/login" className='loginLink'>
                                    <p className='navPara settings'>Logout</p>
                                </Link>
                            </div>
                        </div>
                        {/* <div className='navIcon supportIcon'>
                            <IoIosHelpCircleOutline className="nvicon" />
                        </div> */}
                        {/* <div className='navCaption supCap'>
                            <p className='navPara support'>Help & Support</p>

                        </div> */}
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default Navbar;



