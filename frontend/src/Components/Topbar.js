import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logout } from "../Redux/User_slice"
import logo from "../Photos/gic-logo.jpg"

function Topbar() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    document.addEventListener('mouseup', function (e) {

        if (isDropdownOpen) {
            let container = document.getElementById('container');
            if (!container.contains(e.target)) {
                container.style.display = 'none';
            }
        }
    });

    const LogoutFunc = () => {
        dispatch(Logout());
    }



    return (
        <div className=' w-full bg-white shadow h-16 z-10 flex justify-between items-center px-10 relative'>
            <div>
                <Link to="/">
                    <img src={logo} alt="" className=' w-16' />
                </Link>
            </div>
            <div>
                <span onClick={toggleDropdown} className=" cursor-pointer">Menu</span>
                {
                    isDropdownOpen ?
                        <div id='container' className=' p-1 bg-white absolute top-16 right-2 shadow shadow-gray-200 rounded'>
                            <Link to="/login" onClick={LogoutFunc} className=' flex items-center px-5 py-1 hover:bg-black hover:bg-opacity-10 rounded'>
                                <p className=' text-red-400'>Logout</p>
                            </Link>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}

export default Topbar