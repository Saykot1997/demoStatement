import React, { useState } from 'react'
import logo from "../Photos/jamunabank.jpg"

function JamunaBankThree() {

    const [editMode, setEditMode] = useState(false);
    const [branchName, setBranchName] = useState("Shantinagar Branch")
    const [branchAddress, setBranchAddress] = useState("Shantinagar, Green City Edge, Bangladesh")
    const [branchPhone, setBranchPhone] = useState("+8801777777777")
    const [branchEmail, setBranchEmail] = useState("example@gamil.com")
    const [pabx, setPabx] = useState("972438,9347539,9348753")
    const [swift, setSwift] = useState("JAMUNABANK")
    const [branchWord, setBranchWord] = useState("19")
    const [branchState, setBranchState] = useState("Dhaka")
    const [branchCity, setBranchCity] = useState("Bangladesh")
    const [printDate, setPrintDate] = useState("MAY 22,2020")
    const [jbl, setJbl] = useState("JBL/SNB/GB/2020/522")
    const [accountHolderName, setAccountHolderName] = useState("mohd.momiur rahman")
    const [accountHolderAddress, setAccountHolderAddress] = useState("31/1 SARAT GUPTA ROAD, SHANTINAGAR, GREEN CITY EDGE, BANGLADESH")
    const [todaysDate, setTodaysDate] = useState("May 22,2020")
    const [accountNumber, setAccountNumber] = useState("0123456789")
    const [accountType, setAccountType] = useState("Savings")
    const [accountBalance, setAccountBalance] = useState("1000")
    const [usdCurrancyConversionRate, setUsdCurrancyConversionRate] = useState("87.60")
    const [accountOpeningDate, setAccountOpeningDate] = useState("04/08/2004")
    const [oldAccountNumber, setOldAccountNumber] = useState("0123456789")

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const printWebPage = () => {
        window.print();
    }


    return (
        <div className=' w-full min-h-screen px-20 print:px-5'>
            {
                editMode ?
                    <div className='absolute top-5 right-0 print:hidden'>
                        <button onClick={toggleEditMode} className="bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700 ">Save</button>
                        <button onClick={toggleEditMode} className="bg-red-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-red-700 ">Cencel</button>
                    </div>
                    :
                    <div className='absolute top-5 right-0 print:hidden'>
                        <button onClick={toggleEditMode} className=' bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700'>Edit</button>
                        <button onClick={printWebPage} className=' bg-green-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-green-700'>Print</button>
                    </div>
            }
            <div className=' flex justify-between items-center'>
                <div className=' w-1/2'>
                    <img src={logo} alt="" className='w-52' />
                </div>
                <div className=' pl-20 w-1/2 print:text-[12px]'>
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Branch Name</span>
                                <span className=' mx-2 '>:</span>
                                <input type="text" placeholder='Branch Name' value={branchName} onChange={(e) => setBranchName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <p className=' font-semibold text-xl'>{branchName}</p>
                    }
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Branch Address</span>
                                <span className=' mx-2'>:</span>
                                <input type="text" placeholder='Branch Address' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <p>{branchAddress}</p>
                    }
                    {
                        editMode ?
                            <div>
                                <div className=' flex items-center'>
                                    <span>Branch Word</span>
                                    <span className=' mx-2'>:</span>
                                    <input type="text" placeholder='Branch word' value={branchWord} onChange={(e) => setBranchWord(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                <div className=' flex items-center'>
                                    <span>Branch State</span>
                                    <span className=' mx-2'>:</span>
                                    <input type="text" placeholder='Branch state' value={branchState} onChange={(e) => setBranchState(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                <div className=' flex items-center'>
                                    <span>Branch City</span>
                                    <span className=' mx-2'>:</span>
                                    <input type="text" placeholder='Branch City' value={branchCity} onChange={(e) => setBranchCity(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                            </div>
                            :
                            <p>Ward No {branchWord} {branchState} {branchCity}</p>

                    }
                    {
                        editMode ?

                            <div className=' flex items-center'>
                                <span>Branch Phone</span>
                                <span className=' mx-2'>:</span>
                                <input type="text" placeholder='Branch Phone' value={branchPhone} onChange={(e) => setBranchPhone(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>

                            :
                            <p>Phone No :{branchPhone}</p>
                    }
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>PABX</span>
                                <span className='mx-2'>:</span>
                                <input type="text" placeholder='Branch Pabx' value={pabx} onChange={(e) => setPabx(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :

                            <p>PABX : {pabx}</p>
                    }
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Branch Email</span>
                                <span className=' mx-2'>:</span>
                                <input type="text" placeholder='Branch Email' value={branchEmail} onChange={(e) => setBranchEmail(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <p>E-mail : {branchEmail}</p>
                    }
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Swift</span>
                                <span className=' mx-2'>:</span>
                                <input type="text" placeholder='Branch Swift' value={swift} onChange={(e) => setSwift(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :

                            <p>SWIFT : {swift}</p>
                    }
                </div>
            </div>
            <div>
                <p className=' text-lg font-semibold print:font-medium'>JBL/SNB/GB/2022/522</p>
                {
                    editMode ?
                        <div className=' flex items-center'>
                            <span>Today Date</span>
                            <span className=' mx-2'>:</span>
                            <input type="text" placeholder='Invoice No' value={todaysDate} onChange={(e) => setTodaysDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        </div>
                        :
                        <p className=' text-xl text-gray-600'>{todaysDate}</p>

                }
            </div>
            <div className=' flex justify-center mt-5'>
                <span className='text-xl font-semibold print:font-medium border-b border-gray-400'>To Whome It May Concern</span>
            </div>

            <div className=' mt-10'>
                <p >This is to certify that
                    {
                        editMode ?
                            <input type="text" placeholder='Account Holder Name' value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                            :
                            <span className=' font-medium mx-1 uppercase'>{accountHolderName}</span>
                    }

                    Permanent Address:

                    {
                        editMode ?
                            <input type="text" placeholder='Account Holder Address' value={accountHolderAddress} onChange={(e) => setAccountHolderAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /> :
                            <span className=' mx-1 uppercase'>{accountHolderAddress}</span>
                    }
                    has been maintaining a
                    {
                        editMode ?
                            <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                            :
                            <span className=' mx-1'>{accountType}</span>
                    }

                    Account with our branch. The details of the said scheme as on

                    {
                        editMode ?
                            <input type="text" placeholder='print date' value={printDate} onChange={(e) => setPrintDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                            :
                            <span className=' mx-1'>{printDate}</span>
                    }
                    are given blow: </p>
            </div>

            <div className=' mt-10'>
                <table className=' w-full'>
                    <thead>
                        <tr className=''>
                            <td className=' px-2 border w-[20%]'>A/c No</td>
                            <td className=' px-2 border'>Type of Account</td>
                            <td className=' px-2 border'>Account Name</td>
                            <td className=' px-2 border'>Opening Date</td>
                            <td className=' px-2 border w-[20%]'>Present Balance (Tk.)</td>
                            <td className=' px-2 border w-[16%]'>Present Balance (USD)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className=' border p-2'>
                                {
                                    editMode ?
                                        <input type="text" placeholder='Account No' value={oldAccountNumber} onChange={(e) => setOldAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                        :
                                        <span className=' mx-1'>{oldAccountNumber}</span>
                                }
                                <p>Update A/C Number</p>
                                {
                                    editMode ?
                                        <input type="text" placeholder='Account No' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                        :

                                        <p>{accountNumber}</p>
                                }
                            </td>
                            <td className=' border p-2'>{accountType}</td>
                            <td className=' border p-2 uppercase'>{accountHolderName}</td>
                            {
                                editMode ?

                                    <td className=' border p-2'>
                                        <input type="text" placeholder='Opening Date' value={accountOpeningDate} onChange={(e) => setAccountOpeningDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    </td>
                                    :
                                    <td className=' border p-2'>{accountOpeningDate}</td>

                            }
                            {
                                editMode ?

                                    <td className=' border p-2'>
                                        <input type="text" placeholder='Present Balance' value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    </td>
                                    :
                                    <td className=' border p-2'>{accountBalance}</td>
                            }
                            <td className=' border p-2'>{parseFloat(parseInt(accountBalance) / parseInt(usdCurrancyConversionRate)).toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                {
                    editMode ?
                        <div>
                            <span>1 USD = </span>
                            <input value={usdCurrancyConversionRate} onChange={(e) => setUsdCurrancyConversionRate(e.target.value)} type="text" placeholder='USD Conbert Rate' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                        </div>
                        :
                        <p className=' my-5'>1 USD = {usdCurrancyConversionRate} </p>

                }
                <p className=' mt-10'>We wish him every success in life.</p>
                <div className=' flex justify-between w-full mt-20'>
                    <div className=' w-1/2'>
                        <p className=' font-semibold'>Mrinalni Saha</p>
                        <p className=' font-semibold'>{"SEO & GB Incharge"}</p>
                    </div>
                    <div className=' w-1/2'>
                        <p className=' font-semibold'>K.M Khairul Islam</p>
                        <p className=' font-semibold'>{"FAVP & Manager Operations"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JamunaBankThree