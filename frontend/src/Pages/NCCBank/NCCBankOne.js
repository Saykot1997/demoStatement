import axios from 'axios';
import commaNumber from 'comma-number';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../../Data';
import logo from "../Photos/nccbank.jpg";
import { fatchSuccess } from '../../Redux/Banks_slice';
import { TransactionAmountFatchSuccess } from '../../Redux/TransactionAmount_slice';
import { transactionsFatchSuccess } from '../../Redux/Transactions_slice';
import GenerateRandomTranjections from '../../Utils/GenerateRandomTransaction';

function NCCBankOne() {

    const [randomTransictions, setRandomTransictions] = useState([])
    const [initialBranchCode, setInitialBranchCode] = useState(32)
    const [transactionQuantity, setTransactionQuantity] = useState(40);
    const [initialBalance, setInitialBalance] = useState(400000);
    const [editMode, setEditMode] = useState(false);
    const [branchName, setBranchName] = useState("Shantinagar Branch");
    const [branchAddress, setBranchAddress] = useState("Green City Edge, 89, Kakrail ,Dhaka-1000");
    const [branchPhone, setBranchPhone] = useState("8355179");
    const [branchFax, setBranchFax] = useState("8355649");
    const [accountStatusTop, setAccountStatusTop] = useState("Active");
    const [accountType, setAccountType] = useState("Saving Bank Deposit");
    const [accountNumber, setAccountNumber] = useState("0009-03100007098");
    const [accountHoldersName, setAccountHoldersName] = useState("MOHD MOMINUR RAHMAN");
    const [accountHoldersAddress, setAccountHoldersAddress] = useState("33/1 SARAT GUPTA ROAD NARINDA DHAKA");
    const [accountOpeningDate, setAccountOpeningDate] = useState("27 Feb 2013");
    const [entryDate, setEntryDate] = useState("27 Feb 2013");
    const [accountInterestRate, setAccountInterestRate] = useState("2");
    const [accountStatus, setAccountStatus] = useState("OPERATIVE");
    const [startStatementDate, setStartStatementDate] = useState("01/10/2021");
    const [endStatementDate, setEndStatementDate] = useState("31/03/2022");
    const [hideStartStatementDate, setHideStartStatementDate] = useState("2021-10-01");
    const [hideEndStatementDate, setHideEndStatementDate] = useState("2022-03-31");
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const Transactions = useSelector(state => state.Transactions.Transactions);
    const Banks = useSelector(state => state.Banks.Banks);
    const User = useSelector(state => state.User.User);
    const dispatch = useDispatch();
    const TransactionAmount = useSelector(state => state.TransactionAmount.TransactionAmount);

    const getBankTransactions = async (value) => {

        try {

            const res = await axios.get(`${Host}/api/user/transaction/ncc_bank`, {
                headers: {
                    "Authorization": `Bearer ${User}`
                }
            });

            dispatch(transactionsFatchSuccess(res.data))

        } catch (error) {

            console.log(error)
        }
    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const statementDateChange = (option, value) => {

        if (option === "startStatementDate") {

            let startStatementDate = value.split("-");
            let startStatementDateYear = startStatementDate[0];
            let startStatementDateMonth = startStatementDate[1];
            let startStatementDateDay = startStatementDate[2];

            setStartStatementDate(`${startStatementDateDay}/${startStatementDateMonth}/${startStatementDateYear}`);
            setHideStartStatementDate(`${startStatementDateYear}-${startStatementDateMonth}-${startStatementDateDay}`);

        } else if (option === "endStatementDate") {

            let endStatementDate = value.split("-");
            let endStatementDateYear = endStatementDate[0];
            let endStatementDateMonth = endStatementDate[1];
            let endStatementDateDay = endStatementDate[2];

            setEndStatementDate(`${endStatementDateDay}/${endStatementDateMonth}/${endStatementDateYear}`);
            setHideEndStatementDate(`${endStatementDateYear}-${endStatementDateMonth}-${endStatementDateDay}`);
        }
    }

    const GenerateTranjections = () => {

        if (!Transactions.length > 0) {
            return alert("No Transactions Found. Please select Bank Transaction First.")
        }

        if (!TransactionAmount.ATM.length > 0 || !TransactionAmount.Cheque.length > 0) {
            return alert("No Transaction Amount Found. Please insert Transaction Amount First.")
        }

        const allData = GenerateRandomTranjections(hideStartStatementDate, hideEndStatementDate, Transactions, transactionQuantity, initialBalance, TransactionAmount.ATM, TransactionAmount.Cheque);
        setTotalWithdrawal(allData.TotalWithdrawal);
        setTotalDeposit(allData.TotalDeposit);
        setRandomTransictions(allData.RandomTransictions);
        toggleEditMode();
    }

    const printWebPage = () => {
        window.print();
    }

    const getTransectionsAmounts = async () => {

        try {

            const response = await axios.get(`${Host}/api/user/transactionAmount`, {
                headers: {
                    Authorization: `Bearer ${User}`
                }
            })

            dispatch(TransactionAmountFatchSuccess(response.data))

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        getBankTransactions();
        getTransectionsAmounts()

    }, [])




    return (
        <div className=' w-full min-h-screen p-5 print:p-0'>

            {
                editMode ?
                    <div className='absolute top-12 right-0 print:hidden'>
                        <button onClick={GenerateTranjections} className="bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700 ">Save</button>
                        <button onClick={toggleEditMode} className="bg-red-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-red-700 ">Cencel</button>
                    </div>
                    :
                    <div className='absolute top-12 right-0 print:hidden'>
                        <button onClick={toggleEditMode} className=' bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700'>Edit</button>
                        <button onClick={printWebPage} className=' bg-green-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-green-700'>Print</button>
                    </div>
            }
            {/* header start */}
            <div className=' w-full flex '>
                <div className=' w-1/2 flex'>
                    <div>
                        <img src={logo} alt="" className=' w-24 h-36' />
                    </div>
                    <div className=' ml-3'>
                        <p className=' text-xl print:text-lg'>NCC Bank Limited</p>
                        {
                            editMode ?
                                <input type="text" placeholder='Branch Name' value={branchName} onChange={(e) => setBranchName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :
                                <p className=' text-lg print:text-base'>{branchName}</p>

                        }
                        {
                            editMode ?

                                <input type="text" placeholder='Branch Code' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block w-full' />
                                :

                                <p className='mt-5 print:mt-2 print:text-[12px]'>Account Opening Branch : {branchAddress}</p>
                        }
                        {
                            editMode ?

                                <input type="text" placeholder='Branch Address' value={branchPhone} onChange={(e) => setBranchPhone(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :
                                <p className="my-1 print:my-0 print:text-[12px]">Phone: {branchPhone}</p>
                        }
                        {
                            editMode ?
                                <input type="text" placeholder='Branch Fax' value={branchFax} onChange={(e) => setBranchFax(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                :
                                <p className="my-1 print:my-0 print:text-[12px]">Fax: {branchFax}</p>
                        }
                    </div>
                </div>
                <div className=' w-1/2'>
                    <p className=' font-semibold text-xl uppercase text-right pr-16'>statement of account</p>
                    <div className=' w-full mt-10 print:mt-5 print:text-[12px] pl-5'>
                        {
                            editMode ?
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Account Status</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <input type="text" placeholder='Account Status' value={accountStatusTop} onChange={(e) => setAccountStatusTop(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                                :
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Account Status</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <span className=''>{accountStatusTop}</span>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Account opening date</span>
                                    <span className=' mx-2 font-semibold'>:</span>

                                    <input type="text" placeholder='Account opening date' value={accountOpeningDate} onChange={(e) => setAccountOpeningDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                                :
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Account opening date</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <span className=''>{accountOpeningDate}</span>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Entry Date</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <input type="text" placeholder='Entry Date' value={entryDate} onChange={(e) => setEntryDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                                :
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Entry Date</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <span className=''>{entryDate}</span>
                                </div>
                        }
                        {

                            editMode ?
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Interest/Profit Rate</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <input type="text" placeholder='Interest/Profit Rate' value={accountInterestRate} onChange={(e) => setAccountInterestRate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                                :
                                <div className=' my-1'>
                                    <span className=' inline-block w-40'>Interest/Profit Rate</span>
                                    <span className=' mx-2 font-semibold'>:</span>
                                    <span className=''>{accountInterestRate}</span>
                                </div>
                        }
                    </div>
                </div>
            </div>
            <div className=' w-full flex mt-10 print:mt-5 items-center print:text-[12px]'>
                {
                    editMode ?
                        <div className=' w-1/2'>
                            <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            <input type="text" placeholder='Account Number' value={accountHoldersName} onChange={(e) => setAccountHoldersName(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none block' />
                            <input type="text" placeholder='Account Holders Address' value={accountHoldersAddress} onChange={(e) => setAccountHoldersAddress(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none block' />
                            <p className=' my-1'>Account No: <input type="text" placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /></p>
                            <div className=" leading-7 print:leading-[22px]"><span>Statement Date:</span> <input type="date" placeholder='Start stetment date' value={hideStartStatementDate} onChange={(e) => statementDateChange("startStatementDate", e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /> to <input type="date" placeholder='Start stetment date' value={hideEndStatementDate} onChange={(e) => statementDateChange("endStatementDate", e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /></div>
                        </div>
                        :
                        <div className=' w-1/2'>
                            <p className=' mb-1'>{accountType}</p>
                            <p className=' my-1'>{accountHoldersName}</p>
                            <p className=' my-1 uppercase'>{accountHoldersAddress}</p>
                            <p className=' my-1'>Account No:{accountNumber}</p>
                            <p className=" leading-7 print:text-[10px] print:leading-[22px]">Statement Date: {startStatementDate} to {endStatementDate}</p>
                        </div>

                }
                <div className=' w-1/2'>
                    {
                        editMode ?
                            <div>
                                <p className='pl-5'>Status:
                                    <input type="text" placeholder='Status' value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </p>
                                <div>
                                    <div className=' flex items-center my-1'>
                                        <span className=' font-semibold mr-2'>Initial Blance</span>
                                        <input type="text" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                    </div>
                                    <div className=' flex items-center my-1'>
                                        <span className=' font-semibold mr-2'>Initial Branch Code</span>
                                        <input type="text" value={initialBranchCode} onChange={(e) => setInitialBranchCode(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                    </div>
                                    <div className=' flex items-center'>
                                        <span className=' font-semibold mr-2'>Number of row</span>
                                        <input type="text" value={transactionQuantity} onChange={(e) => setTransactionQuantity(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                    </div>
                                </div>

                            </div>
                            :
                            <p className='pl-5'>Status: {accountStatus}</p>


                    }
                </div>
            </div>
            {/* header end */}

            {/* table start */}

            <table className=' w-full mt-10 print:mt-5'>
                <thead className=''>
                    <tr className=" border border-dashed">
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-left">Date</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-left">Value Date</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-left w-[27%]">Particular</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-right">Withdrawal(Dr)</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-right">Deposit(Cr)</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-right">Balance</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-right">Branch</th>
                        <th className=" font-medium print:font-normal print:text-[10px] pb-1 text-right">Time</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="">
                        <td className=" text-sm print:text-[10px] print:mr-[2px]">{startStatementDate}</td>
                        <td className="text-sm print:text-[10px] print:mr-[2px]">{startStatementDate}</td>
                        <td className="text-sm print:text-[10px] print:mr-[2px] w-[27%] uppercase">Opening Balance</td>
                        <td className="text-sm print:text-[10px] print:mr-[2px] text-right"></td>
                        <td className="text-sm print:text-[10px] print:mr-[2px] text-right"></td>
                        <td className="text-sm print:text-[10px] print:mr-[2px] text-right">{commaNumber(initialBalance)} CR</td>
                        <td className="text-sm print:text-[10px] print:mr-[2px] text-right">{initialBranchCode}</td>
                        <td className="text-right text-sm print:text-[9px] print:ml-[2px]">12:00</td>
                    </tr>

                    {
                        randomTransictions.length > 0 && randomTransictions.map((item, index) => {
                            return (
                                <tr className="" key={index}>
                                    <td className=" text-sm print:text-[10px] print:leading-[13px] uppercase">
                                        <p>{item.date}</p>
                                    </td>
                                    <td className="text-sm print:text-[10px] print:leading-[13px] uppercase">
                                        <p>{item.date}</p>
                                    </td>
                                    <td className="text-sm print:text-[10px] print:leading-[13px] w-[27%] pr-2">
                                        <p>{item.particular}</p>
                                    </td>
                                    <td className="text-sm print:text-[10px] print:leading-[13px] uppercase text-right">
                                        <p>{item.withdrawal > 0 && commaNumber(item.withdrawal)}</p>
                                    </td>
                                    <td className="text-sm print:text-[10px] print:leading-[13px] uppercase text-right">
                                        <p>{item.deposit > 0 && commaNumber(item.deposit)}</p>
                                    </td>
                                    <td className="text-sm print:text-[10px] print:leading-[13px] uppercase text-right">
                                        <p>{commaNumber(item.balance)} CR</p>
                                    </td>
                                    <td className="text-sm print:text-[10px] print:leading-[13px] uppercase text-right">
                                        <p>{item.branchCode}</p>
                                    </td>
                                    <td className=" text-right text-sm print:text-[10px] print:leading-[13px] uppercase">
                                        <p>{item.time}</p>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    <tr>
                        <td className=" text-sm print:text-[10px] p-2"></td>
                        <td className=" text-center text-sm print:text-[10px] p-2"></td>
                        <td className=" text-centert text-sm print:text-[10px] p-2 border-t border-dashed">Total</td>
                        <td className=" text-right text-sm print:text-[10px] p-2 border-t border-dashed">{commaNumber(totalWithdrawal)}</td>
                        <td className=" text-right text-sm print:text-[10px] p-2 border-t border-dashed">{commaNumber(totalDeposit)}</td>
                        <td className=" text-center text-sm print:text-[10px] p-2"></td>
                        <td className=" text-center text-sm print:text-[10px] p-2"></td>
                        <td className=" text-right text-sm print:text-[10px] p-2"></td>
                    </tr>

                </tbody>
            </table>

            {/* table end */}

        </div>
    )
}

export default NCCBankOne