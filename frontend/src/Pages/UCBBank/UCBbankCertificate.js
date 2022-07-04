import React, { useState } from 'react'
import logo from "../../Photos/ucb_bank/logo.png";
import signature2 from "../../Photos/ucb_bank/sig 2.png";
import signature1 from "../../Photos/ucb_bank/sif 1.png";
import sile from "../../Photos/ucb_bank/sil.png"
import commaNumber from 'comma-number';

function UCBbankCertificate() {

    const [footerContractInfo, setFooterContractInfo] = useState("Phone: +880-2 55668070, +889610999999, E-mail: info@ucb.com.bd")
    const [footerAddress, setFooterAddress] = useState("Plot-CWS(A)-1 Road No-34 Gulshan Avenue, Dhaka - 1212, Bangladesh")
    const [branchAddress, setBranchAddress] = useState('"Waqf Bhaban" (1st Floor) 4, New Eskaton Road, Dhaka - 1000')
    const [printDate, setPrintDate] = useState("18.05.2022");
    const [ref, setRef] = useState("UCBL/GB/NEB/2022");
    const [editMode, setEditMode] = useState(false);
    const [accountHolderName, setAccountHolderName] = useState("Mahedi Hasan Munna")
    const [accountHolderFotherName, setAccountHolderFotherName] = useState("Md Alamgir Miah")
    const [leftManagerName, setLeftManegerName] = useState("Mohammad Mahabub Alam");
    const [leftManagerPost, setLeftManegerPost] = useState("FAVP & Operation Manager");
    const [rightManagerName, setRightManegerName] = useState("Kazi Muzibul Islam");
    const [rightManagerPost, setRightManegerPost] = useState("EVP & Head of Branch");
    const [accountHolderAddress, setAccountHolderAddress] = useState("40/A, Holding No-20, Cantonment-4, Mohakhali, Dhaka Cantonment, Bangladesh")
    const [branchPhoneNumber, setBranchPhoneNumber] = useState('028333321,8333326,833360')
    const [branchRoutingNumber, setBranchRoutingNumber] = useState("245261396")
    const [accountNumber, setAccountNumber] = useState("0943211000001452")
    const [accountType, setAccountType] = useState("Saving Deposit")
    const [accountBalance, setAccountBalance] = useState("1000")
    const [usdCurrancyConversionRate, setUsdCurrancyConversionRate] = useState("87.60")
    const [inWordBdTaka, setInWordBdTaka] = useState("Thirty-One Lac Fifty-Three Thousand Six Hundred Twenty-Six Point Seventy only")
    const [inWordUsdTaka, setInWordUsdTaka] = useState("Thirty-three Thousand Nine Hundred Nine Point Ninety-Six only")


    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const printWebPage = () => {
        window.print();
    }



    return (
        <div className=" w-full p-10  font-lora print:p-10 print:pb-2 bg-ucb-water-mark bg-100% bg-left-bottom print:bg-left-custom h-full bg-no-repeat">
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

            <div className=' w-full flex justify-between'>
                <div>
                    <img src={logo} alt="" className=' w-40 mt-5' />
                </div>
                <div className=' text-right print:text-[12px]'>
                    <p className=' font-semibold'>New Eskaton Branch</p>
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Address</span>
                                <span>:</span>
                                <input type="text" placeholder='House' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                            </div>
                            :
                            <p className='w-[260px]'>{branchAddress}</p>
                    }

                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Phone</span>
                                <span>:</span>
                                <input type="text" placeholder='Branch Phone' value={branchPhoneNumber} onChange={(e) => setBranchPhoneNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                            </div>
                            :
                            <p>Phone:{branchPhoneNumber}</p>
                    }
                    <p>Swift Code:UCBLBDDH</p>
                    {
                        editMode ?

                            <div className=' flex items-center'>
                                <span>Branch Routing Number</span>
                                <span>:</span>
                                <input type="text" placeholder='Routing Number' value={branchRoutingNumber} onChange={(e) => setBranchRoutingNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                            </div>
                            :
                            <p>Routing Number :{branchRoutingNumber}</p>
                    }
                    <p>Web:<span className=' border-b border-gray-300'>www.ucb.com.bd</span></p>
                    <span className=' border-b border-gray-400'>E-mail:neb@ucb.com.bd</span>
                </div>
            </div>

            <div className=' w-full px-10 print:pb-48'>

                <div className=' my-8'>
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span>Ref</span>
                                <span>:</span>
                                <input type="text" placeholder='Ref' value={ref} onChange={(e) => setRef(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                            </div>
                            :

                            <p className=' font-semibold text-gray-800'>{ref}</p>

                    }
                </div>

                <div className=' text-center my-10'>
                    <span className=' border-b border-gray-800 font-semibold capitalize text-gray-900'>To Whom It May Concern</span>
                </div>
                <div>
                    <p className='leading-7'>This is to inform that
                        {
                            editMode ?
                                <input type="text" placeholder='Account Holder Name' value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''> {accountHolderName}, </span>
                        }Son of
                        {
                            editMode ?
                                <input type="text" placeholder='Father Name' value={accountHolderFotherName} onChange={(e) => setAccountHolderFotherName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''> {accountHolderFotherName}, </span>
                        }
                        at
                        {
                            editMode ?
                                <input type="text" placeholder='Address ' value={accountHolderAddress} onChange={(e) => setAccountHolderAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                :
                                <span className=''> {accountHolderAddress} </span>
                        }
                        have been maintaing the following

                        {
                            editMode ?
                                <input type="text" placeholder='Account Number' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''> {accountType} </span>
                        }
                        account bearing No.
                        {
                            editMode ?
                                <input type="text" placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                :
                                <span className=''>{accountNumber} </span>
                        }
                        with us. Details as follows:
                    </p>
                </div>
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
                            <th className=' border border-gray-600 pb-2 px-1 w-[10%] text-gray-900'>SL no</th>
                            <th className=' border border-gray-600 pb-2 px-1 w-[23%] text-gray-900'>Account Number</th>
                            <th className=' border border-gray-600 pb-2 px-1 w-[23%] text-gray-900'>Account Type</th>
                            <th className=' border border-gray-600 pb-2 px-1 text-gray-900'>
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
                            <th className=' border border-gray-600 pb-2 w-[25%] text-gray-900'>
                                <p>Equivalent to USD</p>
                                <p className=' text-sm font-normal'>(USD.1.00 = BDT.{parseFloat(usdCurrancyConversionRate).toFixed(2)})</p>
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
                    <p className=' leading-4 mt-1 print:text-sm'>In word: <span className=' font-semibold text-gray-800'>BDT</span>. {

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
                <div className=' text-center mt-5'>
                    <p className=' font-semibold text-lg text-gray-900'>FOR UNITED COMMERCIAL BANK PLC.</p>
                </div>

                <div className=' grid grid-cols-3 mt-14 items-center'>

                    <div className=' w-full relative'>
                        <div className=''>
                            <img src={signature1} alt="" className=' w-52 translate-y-3' />
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Name' value={leftManagerName} onChange={(e) => setLeftManegerName(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p>{leftManagerName}</p>
                            }
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Post' value={leftManagerPost} onChange={(e) => setLeftManegerPost(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p>{leftManagerPost}</p>

                            }
                        </div>
                    </div>

                    <div className=' w-full flex justify-center'>
                        <div>
                            <img src={sile} alt="" className=' w-32' />
                        </div>
                    </div>

                    <div className=' w-full relative flex justify-end '>
                        <div className=' -translate-y-3'>
                            <img src={signature2} alt="" className=' w-40 translate-y-3' />
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Name' value={rightManagerName} onChange={(e) => setRightManegerName(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p>{rightManagerName}</p>
                            }
                            {
                                editMode ?
                                    <input type="text" placeholder='Manager Post' value={rightManagerPost} onChange={(e) => setRightManegerPost(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    :
                                    <p>{rightManagerPost}</p>

                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className=' text-gray-500 leading-5 text-sm mt-[120px] print:fixed bottom-3 font-sans'>
                <p className=' text-red-800 text-lg font-semibold'>United Commercial Bank Limited</p>
                {
                    editMode ?
                        <div>
                            <span>Corporate Office:</span>
                            <input type="text" placeholder='Footer Address' value={footerAddress} onChange={(e) => setFooterAddress(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                        </div>
                        :
                        <p className=' w-[300px]'>Corporate Office:{footerAddress}.</p>

                }
                {
                    editMode ?
                        <div>
                            <span>Footer Contract Info:</span>
                            <input type="text" placeholder='Footer Address' value={footerContractInfo} onChange={(e) => setFooterContractInfo(e.target.value)} className=' w-full rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                        </div>
                        :
                        <p>{footerContractInfo}</p>
                }

            </div>
        </div>
    )
}

export default UCBbankCertificate