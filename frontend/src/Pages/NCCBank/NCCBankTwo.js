import React, { useState } from 'react'
import logo from "../Photos/nccbank.jpg"

function NCCBankTwo() {

    const [jblDate, setJblDate] = useState("MAY 20, 2020");
    const [jblName, setJblName] = useState("JBL/SNB/GB/2022/522");
    const [editMode, setEditMode] = useState(false);
    const [accountHolderName, setAccountHolderName] = useState("MOHD. MOMINUR RAHMAN");
    const [accountHolderAddress, setAccountHolderAddress] = useState("33/1 SARAT GUPTA ROAD, NARINDA DHAKA");
    const [accountNumber, setAccountNumber] = useState("0005-0330374567");
    const [accountBalance, setAccountBalance] = useState("51000");
    const [usdConversionRate, setUsdConversionRate] = useState("87.5");
    const [accountType, setAccountType] = useState("Savings");
    const [accountOpeningDate, setAccountOpeningDate] = useState("22/05/2022");


    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const printWebPage = () => {
        window.print();
    }

    return (

        <div className=' w-full min-h-screen p-5 print:p-0'>
            {
                editMode ?
                    <div className='absolute top-5 right-5 print:hidden'>
                        <button onClick={toggleEditMode} className="bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700 ">Save</button>
                        <button onClick={toggleEditMode} className="bg-red-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-red-700 ">Cencel</button>
                    </div>
                    :
                    <div className='absolute top-5 right-5 print:hidden'>
                        <button onClick={toggleEditMode} className=' bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700'>Edit</button>
                        <button onClick={printWebPage} className=' bg-green-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-green-700'>Print</button>
                    </div>
            }
            <div className=' flex justify-between items-center'>
                <div>
                    <div>
                        <img src={logo} alt="" className=' w-60' />
                    </div>
                </div>
                <div>
                    <p className=' uppercase font-semibold print:font-medium'>National credit and commerce bank limited</p>
                </div>
            </div>
            <div className=' px-[100px]'>
                <div>
                    {
                        editMode ?
                            <div>
                                <span className=' mr-1'>Jbl Name :</span>
                                <input type="text" value={jblName} onChange={(e) => setJblName(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                            </div>
                            :
                            <p className=' text-lg font-semibold print:font-medium'>{jblName}</p>

                    }
                    {
                        editMode ?
                            <div>
                                <span className=' mr-1'>Jbl Date :</span>
                                <input type="text" value={jblDate} onChange={(e) => setJblDate(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                            </div>
                            :

                            <p className=' text-xl text-gray-600'>{jblDate}</p>
                    }
                </div>
                <div className=' flex justify-center mt-10'>
                    <span className='text-xl font-semibold print:font-medium border-b border-gray-400'>To Whome It May Concern</span>
                </div>

                <div className=' mt-10'>
                    <p >This is to certify that

                        {

                            editMode ?
                                <input type="text" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                :
                                <span className='font-medium uppercase mx-1'>{accountHolderName}</span>
                        }
                        of

                        {
                            editMode ?
                                <input type="text" value={accountHolderAddress} onChange={(e) => setAccountHolderAddress(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                :
                                <span className='mx-1'>33/1 SARAT GUPTA ROAD, NARINDA DHAKA</span>
                        }
                        has been maintaining a

                        {
                            editMode ?
                                <input type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                :
                                <span className='mx-1'>{accountType}</span>
                        }
                        Account bearing no

                        {
                            editMode ?
                                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                :
                                <span className='mx-1'>{accountNumber}</span>
                        }
                        scince
                        {
                            editMode ?

                                <input type="text" value={accountOpeningDate} onChange={(e) => setAccountOpeningDate(e.target.value)} className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                :
                                <span className='mx-1'>{accountOpeningDate}</span>

                        }

                        with our branch </p>
                </div>

                <div className=' mt-10 print:mt-5'>
                    <table className=' w-full'>
                        <thead>
                            <tr className=''>
                                <td className=' font-medium p-2 border'>SL.NO</td>
                                <td className=' font-medium p-2 border'>Account Number</td>
                                <td className=' font-medium p-2 border'>Account Name</td>
                                <td className=' font-medium p-2 border'>Balance As on 19.05.2022</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className=' border p-2 print:text-sm'>1</td>
                                <td className=' border p-2 print:text-sm'>{accountNumber}</td>
                                <td className=' border p-2 print:text-sm'>{accountHolderName}</td>
                                <td className=' border p-2 print:text-sm'>

                                    {
                                        editMode ?
                                            <div>
                                                <div>
                                                    <span>Account Balance</span>
                                                    <input type="text" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} placeholder="Account Balance" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                                </div>
                                                <div>
                                                    <span>USD Conversion Rate</span>
                                                    <input type="text" value={usdConversionRate} onChange={(e) => setUsdConversionRate(e.target.value)} placeholder="USD Conversion Rate" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                                </div>
                                            </div>
                                            :
                                            <p> BDT {accountBalance} eqvt/ tp USD {parseFloat(parseInt(accountBalance) / parseInt(usdConversionRate)).toFixed(2)}@{usdConversionRate}</p>
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <p className=' my-5'> <span className=' font-medium uppercase'>{accountHolderName}</span> has been maintaing above Saving deposite account satisfactory with our branch. Based on transactions of the account with us he is deemed financially sound and solvend. </p>
                    <p>We wish him every success in life.</p>
                    <p className=' py-20'>For NCC Bank Ltd</p>
                    <div className=' flex justify-between w-full'>
                        <div className=' w-1/2'>
                            <p className=' font-semibold'>Authorized Officer</p>
                        </div>
                        <div className=' w-1/2'>
                            <p className=' font-semibold'>Authorized Officer</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NCCBankTwo