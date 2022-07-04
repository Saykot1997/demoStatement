import React, { useState } from 'react'
import logo from "../../Photos/uco_bank/logo.jpg";
import signature2 from "../../Photos/ucb_bank/sig 2.png";
import signature1 from "../../Photos/ucb_bank/sif 1.png";
import sile from "../../Photos/uco_bank/sil.png"
import commaNumber from 'comma-number';

function UCObankCertificate() {

    const [printDate, setPrintDate] = useState("18.05.2022");
    const [editMode, setEditMode] = useState(false);
    const [accountHolderName, setAccountHolderName] = useState("Mohd.Momiur Rahman")
    const [accountHolderFotherName, setAccountHolderFotherName] = useState("Mr. Kabir Ahamed")
    const [accountHolderAddress, setAccountHolderAddress] = useState("40/A, Holding No-20, Cantonment-4, Mohakhali, Dhaka Cantonment, Bangladesh")
    const [accountNumber, setAccountNumber] = useState("0943211000001452")
    const [accountType, setAccountType] = useState("Saving")
    const [accountBalance, setAccountBalance] = useState("1000")
    const [usdCurrancyConversionRate, setUsdCurrancyConversionRate] = useState("87.60")
    const [inWordBdTaka, setInWordBdTaka] = useState("Thirty-One Lac Fifty-Three Thousand Six Hundred Twenty-Six Point Seventy only")
    const [inWordUsdTaka, setInWordUsdTaka] = useState("Thirty-three Thousand Nine Hundred Nine Point Ninety-Six only")
    const [leftManagerName, setLeftManagerName] = useState("Mohammad Mahabub Alam");
    const [leftManagerposition, setLeftManagerPosition] = useState("FAVP & Operation Manager");
    const [rightManagerName, setRightManagerName] = useState("Kazi Muzibul Islam");
    const [rightManagerposition, setRightManagerPosition] = useState("EVP & Head of Branch");

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const printWebPage = () => {
        window.print();
    }


    return (
        <div className=" w-full py-20  font-lora print:p-10 print:pb-2  bg-uco-background bg-center backdrop-opacity-40 bg-cover print:bg-85% bg-no-repeat">

            {/* bg-uco-background bg-center backdrop-opacity-40 bg-50% bg-no-repeat */}
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


            <div className=' w-full pt-5 py-16 px-10'>
                <div className=' w-full flex justify-center'>
                    <img src={logo} alt="" className=' w-64' />
                </div>
                <div className=' text-center my-[50px]'>
                    <span className=' border-b border-gray-800 font-semibold capitalize text-gray-800'>To Whom It May Concern</span>
                </div>
                <div>
                    <p className='leading-7'>This is to inform that
                        {
                            editMode ?
                                <input type="text" placeholder='Account Holder Name' value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''> {accountHolderName}, </span>

                        } Son of
                        {
                            editMode ?
                                <input type="text" placeholder='Father Name' value={accountHolderFotherName} onChange={(e) => setAccountHolderFotherName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''> {accountHolderFotherName}, </span>

                        } at  {
                            editMode ?

                                <input type="text" placeholder='Address' value={accountHolderAddress} onChange={(e) => setAccountHolderAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                :
                                <span className=''>{accountHolderAddress} </span>

                        } has been maintaining the following {
                            editMode ?
                                <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''>{accountType} </span>
                        } account bearing No.
                        {
                            editMode ?
                                <input type="text" placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''>{accountNumber} </span>
                        }
                        with us.</p>
                </div>
                <p className=' mt-3'>Details as follows:</p>
                {
                    editMode &&

                    <div className=' flex items-center'>
                        <span>USD Curarncy Rete:</span>
                        <span className=' mx-2'>:</span>
                        <input type="text" placeholder='Print Date' value={usdCurrancyConversionRate} onChange={(e) => setUsdCurrancyConversionRate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                    </div>
                }
                <table className=' w-full mt-3'>
                    <thead>
                        <tr>
                            <th className=' border border-gray-600 pb-2 px-1 w-[10%] text-gray-800'>SL no</th>
                            <th className=' border border-gray-600 pb-2 px-1 w-[23%] text-gray-800'>Account Number</th>
                            <th className=' border border-gray-600 pb-2 px-1 w-[23%] text-gray-800'>Account Type</th>
                            <th className=' border border-gray-600 pb-2 px-1 text-gray-800'>
                                {
                                    editMode ?
                                        <div>
                                            <span>Balance</span>
                                            <input type="text" placeholder='Print Date' value={printDate} onChange={(e) => setPrintDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                        </div>
                                        :
                                        <div>
                                            <p>Balance on</p>
                                            <span className=' text-gray-800 font-normal'>{printDate}</span>
                                        </div>
                                }
                            </th>
                            <th className=' border border-gray-600 pb-2 w-[25%] text-gray-800'>
                                <p>Equivalent to USD</p>

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td className=' border border-gray-500 px-2 text-center w-[10%]'>01</td>
                            <td className=' border border-gray-500 px-2 text-center w-[23%] '>{accountNumber}</td>
                            <td className=' border border-gray-500 px-2 text-center w-[23%]'>{accountType}</td>
                            <td className=' border border-gray-500 px-2 text-center '>
                                {
                                    editMode ?
                                        <input type="text" placeholder='Present Balance' value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                        :
                                        <span className=''>{commaNumber(accountBalance)}</span>
                                }
                            </td>
                            <td className=' border border-gray-500 px-2 text-center w-[23%]'>{commaNumber(parseFloat(parseFloat(accountBalance) / parseFloat(usdCurrancyConversionRate)).toFixed(2))}</td>
                        </tr>
                        <tr >
                            <td className=' border border-gray-500 text-center font-semibold text-gray-800 w-[10%]'></td>
                            <td className=' border border-gray-500 px-2 text-left w-[23%]'>Total</td>
                            <td className=' border border-gray-500 px-2 w-[23%]'></td>
                            <td className=' border border-gray-500 text-center px-2'>{commaNumber(accountBalance)}</td>
                            <td className=' border border-gray-500 text-center px-2 w-[23%]'>{commaNumber(parseFloat(parseFloat(accountBalance) / parseFloat(usdCurrancyConversionRate)).toFixed(2))}</td>
                        </tr>
                    </tbody>
                </table>
                <div className=' text-center'>
                    <p className=' leading-4 mt-1 print:text-sm'>In word: <span className=' font-semibold text-gray-800'>INR</span>. {

                        editMode ?
                            <input type="text" placeholder='balance in word' value={inWordBdTaka} onChange={(e) => setInWordBdTaka(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                            :
                            <span className=' mx-1'>{inWordBdTaka}</span>
                    }
                        or <span className=' font-semibold text-gray-800'>USD</span> . {
                            editMode ?
                                <input type="text" placeholder='balance in word usd' value={inWordUsdTaka} onChange={(e) => setInWordUsdTaka(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span>{inWordUsdTaka}</span>
                        }.</p>
                </div>
                <div className=' my-5'>
                    <p>To the best of our knowledge, the client is financially sound and solvent.</p>
                </div>

                <div className=' grid grid-cols-3 mt-8 items-center'>
                    <div className=' w-full relative'>
                        <div className=''>
                            <img src={signature1} alt="" className=' w-56 translate-y-5' />
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Name' value={leftManagerName} onChange={(e) => setLeftManagerName(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p className=' font-semibold text-gray-800'>{leftManagerName}</p>

                            }
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Position' value={leftManagerposition} onChange={(e) => setLeftManagerPosition(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p>{leftManagerposition}</p>

                            }
                        </div>
                    </div>
                    <div className=' w-full flex justify-center'>
                        <div>
                            <img src={sile} alt="" className=' w-32 ml-10 translate-y-10' />
                        </div>
                    </div>
                    <div className=' w-full relative flex justify-end '>
                        <div className=' -translate-y-3'>
                            <img src={signature2} alt="" className=' w-40 translate-y-7' />
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Name' value={rightManagerName} onChange={(e) => setRightManagerName(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p className=' font-semibold text-gray-800'>{rightManagerName}</p>

                            }
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Position' value={rightManagerposition} onChange={(e) => setRightManagerPosition(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p>{rightManagerposition}</p>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UCObankCertificate