import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Sidebar() {

    const location = useLocation();
    const path = location.pathname;

    return (
        <div className='w-[200px] h-[calc(100vh-64px)] shadow px-2'>
            <ul>
                <Link to="/" className={`py-2 px-5 block hover:bg-gray-100 my-2 rounded font-medium ${path === "/" ? "bg-gray-100" : ""}`}>
                    <li>Format</li>
                </Link>
                <Link to="/transactions" className={`py-2 px-5 block my-2 rounded font-medium hover:bg-gray-100 ${path === "/transactions" ? "bg-gray-100" : ""}`}>
                    <li>Transactions</li>
                </Link>
            </ul>
        </div>
    )
}

export default Sidebar