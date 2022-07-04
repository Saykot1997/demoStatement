
import logo from "../Photos/bankasia.jpg"
import { useState } from 'react';
import commaNumber from "comma-number";

function BankAsiaTwo() {

    const [baDate, setBaDate] = useState("16.05.2022");
    const [editMode, setEditMode] = useState(false);
    const [accountHolderName, setAccountHolderName] = useState("MOHD. MOMINUR RAHMAN");
    const [accountHolderAddress, setAccountHolderAddress] = useState("33/1 SARAT GUPTA ROAD, NARINDA DHAKA");
    const [accountNumber, setAccountNumber] = useState("0005-0330374567");
    const [accountBalance, setAccountBalance] = useState("510000897");
    const [usdConversionRate, setUsdConversionRate] = useState("87.5");


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
            <div className='flex flex-col justify-center  items-center'>
                <img src={logo} alt="" className=' w-60' />
                <p className=" uppercase font-medium text-lg">limited</p>
            </div>
            <div>
                <p className=' text-lg font-semibold print:font-medium'>BA/STR/GB/</p>
                {
                    editMode ?
                        <input value={baDate} onChange={(e) => setBaDate(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                        :
                        <p className=' text-xl text-gray-600'>{baDate}</p>
                }
            </div>
            <div className=' flex justify-center mt-10'>
                <span className='text-xl font-semibold print:font-medium border-b border-gray-400 uppercase'>To Whome It May Concern</span>
            </div>

            {
                editMode &&

                <div>
                    <span>USD Convert Rate</span>
                    <span className=" mx-1">:</span>
                    <input value={usdConversionRate} onChange={(e) => setUsdConversionRate(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                </div>

            }

            <div className=' mt-10'>
                <p >This is to certify that

                    {
                        editMode ?
                            <input value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                            :
                            <span className=' font-medium uppercase mx-1'>{accountHolderName}</span>
                    }
                    Address :
                    {
                        editMode ?
                            <input value={accountHolderAddress} onChange={(e) => setAccountHolderAddress(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                            :
                            <span className=" mx-1">{accountHolderAddress}</span>
                    }
                    has been maintaining a currant account bearing No.

                    {
                        editMode ?
                            <input value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                            :
                            <span className=" font-medium mx-1">{accountNumber}</span>
                    }
                    with an available balance of total TK-

                    {
                        editMode ?
                            <input value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} type="text" className=' border border-blue-500 rounded p-1 focus:outline-none' />
                            :
                            <span className=" font-medium mx-1">{commaNumber(accountBalance)}/-</span>
                    }
                    (Local Currency) which is equevalent to <span className=" font-medium">USD-{parseFloat(parseInt(accountBalance) / parseInt(usdConversionRate)).toFixed(2)}/-</span> .The party is reported to financiallu sound & dslvent.</p>
                <p className=" my-10">This certificate has been issued without prejudice and/or any responsibility on the part of this Bank or any of its officials.</p>
            </div>

            <div className='mt-28'>
                <div className=' flex justify-between w-full'>
                    <div className=' w-1/2'>
                        <p className=' font-semibold'>Authorized Signature</p>
                    </div>
                    <div className=' w-1/2'>
                        <p className=' font-semibold'>Authorized Signature</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankAsiaTwo