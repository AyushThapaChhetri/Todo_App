
import "../Css/Navbar.css"
// import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
// import { IoIosHelpCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';


const Navbar = () => {
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
                    <div className='navSettings'>


                        {/* <div className='navIcon logoutIcon'>
                            <IoIosLogOut className="nviconLogout" />
                        </div> */}
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



