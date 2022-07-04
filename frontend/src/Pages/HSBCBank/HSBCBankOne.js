import React, { useState } from 'react'
import logo from "../Photos/HSBC.svg.png"

function HSBCBankOne() {

    const [applicationDate, setApplicationDate] = useState("May 26,2022")
    const [editMode, setEditMode] = useState(false);
    const [accountHolderName, setAccountHolderName] = useState("MOHD. MOMINUR RAHMAN");
    const [accountHolderAddress, setAccountHolderAddress] = useState("33/1 SARAT GUPTA ROAD");
    const [accountHolderCity, setAccountHolderCity] = useState("Bangladesh");
    const [accountHolderState, setAccountHolderState] = useState("DHAKA");
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
        <div className=' w-full min-h-screen p-10 print:p-5'>
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
            <div className=' flex justify-between'>
                <div className=' w-1/2'>
                    <img src={logo} alt="" className='w-52' />
                </div>
                <div className=' print:text-sm mr-20'>
                    <p className=' text-lg font-medium'>HSBC<span className=' font-semibold'>Select</span></p>
                    <p className=' text-sm my-1'>T- 88 096234567</p>
                    <p className=' text-sm my-1'>www.hsbc.com.bd</p>
                </div>
            </div>
            {
                editMode ?
                    <div>
                        <span>Account Holder Name</span>
                        <input value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                    </div>
                    :

                    <p className=' uppercase'>{accountHolderName}</p>
            }
            {
                editMode ?
                    <div>
                        <span>Account Holder Address</span>
                        <input value={accountHolderAddress} onChange={(e) => setAccountHolderAddress(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                    </div>
                    :
                    <p className=' uppercase'>{accountHolderAddress}</p>
            }
            {
                editMode ?
                    <div>
                        <div>
                            <span>Account Holder State</span>
                            <input value={accountHolderState} onChange={(e) => setAccountHolderState(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                        </div>
                        <div>
                            <span>Account Holder City</span>
                            <input value={accountHolderCity} onChange={(e) => setAccountHolderCity(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                        </div>
                    </div>
                    :

                    <p className=' uppercase'>{accountHolderState}, {accountHolderCity}</p>
            }
            {
                editMode ?
                    <div>
                        <span>Application Date</span>
                        <input value={applicationDate} onChange={(e) => setApplicationDate(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                    </div>
                    :

                    <p className=' my-3 capitalize'>{applicationDate}</p>
            }
            <p className=' my-3 capitalize'>dear sir</p>
            <span className=' border-b border-gray-400 text-lg font-semibold'>Bank certificate</span>

            <div className=' mt-5'>
                <p >This is to certify that you are our valued Select Customer of HSBC Bangladesh (HSBC Select is a local Service Proposition which is designed for High Ner-Worth Individulals). You have been maintaining a Local Currency Saving Account with us. The details of your banking Relationship are as follow:</p>
            </div>

            <div className=' mt-5'>
                <table className=' w-full'>
                    <thead>
                        <tr className=''>
                            <td className=' font-medium p-2 print:py-0 print:px-1 border text-center'>Account Number</td>
                            <td className=' font-medium p-2 print:py-0 print:px-1 border text-center'>Type of Account</td>
                            <td className=' font-medium p-2 print:py-0 print:px-1 border text-center'>Date of Account Opening</td>
                            <td className=' font-medium p-2 print:py-0 print:px-1 border text-center'>Balance as of {applicationDate} BDT.</td>
                            <td className=' font-medium p-2 print:py-0 print:px-1 border text-center'>Balance as of {applicationDate} USD.</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=' border p-2 print:py-0 print:px-1'>
                                {
                                    editMode ?
                                        <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                        :
                                        <span>{accountNumber}</span>
                                }
                            </td>
                            <td className=' border p-2 print:py-0 print:px-1 text-center'>
                                {
                                    editMode ?
                                        <input value={accountType} onChange={(e) => setAccountType(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                        :
                                        <span>{accountType}</span>
                                }
                            </td>
                            <td className=' border p-2 print:py-0 print:px-1 text-center'>
                                {
                                    editMode ?
                                        <input value={accountOpeningDate} onChange={(e) => setAccountOpeningDate(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                        :
                                        <span>{accountOpeningDate}</span>

                                }
                            </td>
                            <td className=' border p-2 print:py-0 print:px-1 text-center'>
                                {
                                    editMode ?
                                        <input value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                                        :
                                        <span>{accountBalance}</span>
                                }
                            </td>
                            <td className=' border p-2 print:py-0 print:px-1 text-center'>{parseFloat(parseInt(accountBalance) / parseInt(usdConversionRate)).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                {
                    editMode ?
                        <div>
                            <span>USD Convertion Rate</span>
                            <input value={usdConversionRate} onChange={(e) => setUsdConversionRate(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                        </div>
                        :

                        <p className=' ml-20 text-sm'>(Conversion rate USD1 = BDT{usdConversionRate}, date on {applicationDate})</p>
                }

                <p>This certificate has been issued upon request from you without any obligation on the part of this Bank and/or any of its officials and/or informants.</p>

                <p className=' my-10'>Best regards</p>

                <div className=''>
                    <div className=''>
                        <hr className=' w-40 h-[2px] bg-gray-500 inline-block'></hr>
                        <p className=' font-semibold'>Sarowar H Hossain</p>
                        <p className=' print:leading-5 text-sm'>Relationship Manager, HSBC Select,</p>
                        <p className=' print:leading-5 text-sm'>Retail Banking & Wealth Management,</p>
                        <p className=' print:leading-5 text-sm'>The Hong Kong and Shanghi Banking Corporation Limited</p>
                        <p className=' print:leading-5 text-sm'>Motijheel Branch, Al - Haj Tower,Plot- 82,</p>
                        <p className=' print:leading-5 text-sm'>Motijheel, Dhaka 1000 Bangladesh</p>
                        <p className=' print:leading-5 text-sm'>Phone. 01723456789</p>
                        <p className=' print:leading-5 text-sm'>Phone. 017123456789</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HSBCBankOne