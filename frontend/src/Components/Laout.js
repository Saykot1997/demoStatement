import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

function Laout({ children }) {
    return (
        <div className=' w-full min-h-screen'>
            <Topbar />
            <div className='flex'>
                <Sidebar />
                <div className='w-[calc(100%-200px)]'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Laout