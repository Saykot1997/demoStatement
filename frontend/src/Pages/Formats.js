import { Link } from 'react-router-dom'

function Formats() {

    return (
        <div className=' w-full h-[calc(100vh-64px)] bg-gray-100 overflow-y-scroll p-5 pt-3'>
            <p className=' text-center font-medium mb-5 text-gray-800'>Statements Formats</p>
            <div className=' w-full grid grid-cols-3 gap-5'>

                <Link to={`/ebl_bank`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>EBL Bank</p>
                    </div>
                </Link>

                <Link to={`/islami_bank`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>Islami Bank</p>
                    </div>
                </Link>
                <Link to={`/ucb_bank`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>UCB Bank</p>
                    </div>
                </Link>
                <Link to={`/uco_bank`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>UCO Bank</p>
                    </div>
                </Link>
                <Link to={`/canara_bank`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>Canara Bank</p>
                    </div>
                </Link>
            </div>
            <p className=' text-center font-medium text-gray-800 my-5'>Certificate Formats</p>
            <div className=' w-full grid grid-cols-3 gap-5'>
                <Link to={`/ebl_bank_solvency`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>EBL Bank Solvency</p>
                    </div>
                </Link>
                <Link to={`/islami_bank_certificate`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>Islami Bank Solvency</p>
                    </div>
                </Link>
                <Link to={`/ucb_bank_solvency`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>UCB Bank Solvency</p>
                    </div>
                </Link>
                <Link to={`/uco_bank_solvency`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>UCO Bank Solvency</p>
                    </div>
                </Link>
                <Link to={`/canara_bank_solvency`}>
                    <div className=' bg-white rounded px-5 py-3 shadow hover:bg-gray-50'>
                        <p className=' text-center font-medium'>Canara Bank Solvency</p>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Formats