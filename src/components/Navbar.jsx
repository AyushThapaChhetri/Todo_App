import React from 'react'
import "../Css/Navbar.css"
import { CiSettings } from "react-icons/ci";
import { IoIosHelpCircleOutline } from "react-icons/io";


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
                        <div className='navIcon settingIcon'>
                            <CiSettings className="nvicon" />
                        </div>
                        <div className='navCaption setCap'>
                            <p className='navPara settings'>Settings</p>
                        </div>
                        <div className='navIcon supportIcon'>
                            <IoIosHelpCircleOutline className="nvicon" />
                        </div>
                        <div className='navCaption supCap'>
                            <p className='navPara support'>Help & Support</p>

                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default Navbar;



