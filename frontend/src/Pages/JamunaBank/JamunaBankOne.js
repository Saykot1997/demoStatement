import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import logo from "../Photos/jamunabank.jpg"
import axios from 'axios';
import { Host } from "../../Data"
import { transactionsFatchSuccess } from '../../Redux/Transactions_slice';
import commaNumber from 'comma-number'
import GenerateRandomTranjections from '../../Utils/GenerateRandomTransaction';
import { TransactionAmountFatchSuccess } from '../../Redux/TransactionAmount_slice';

function JamunaBankOne() {

    const [randomTransictions, setRandomTransictions] = useState([])
    const [initialBranchCode, setInitialBranchCode] = useState(32)
    const [transactionQuantity, setTransactionQuantity] = useState(40);
    const [initialBalance, setInitialBalance] = useState(400000);
    const [editMode, setEditMode] = useState(false);
    const [branchName, setBranchName] = useState("Shantinagar Branch");
    const [branchAddress, setBranchAddress] = useState("Green City Edge, 89, Kakrail ,Dhaka-1000");
    const [branchPhone, setBranchPhone] = useState("8355179");
    const [branchFax, setBranchFax] = useState("8355649");
    const [accountType, setAccountType] = useState("Saving");
    const [accountNumber, setAccountNumber] = useState("0009-03100007098");
    const [accountHoldersName, setAccountHoldersName] = useState("MOHD MOMINUR RAHMAN");
    const [accountHoldersAddress, setAccountHoldersAddress] = useState("33/1 SARAT GUPTA ROAD NARINDA DHAKA");
    const [accountOpeningDate, setAccountOpeningDate] = useState("04/08/2004");
    const [accountCurrency, setAccountCurrency] = useState("TK");
    const [accountMatureDate, setAccountMatureDate] = useState("04/08/2024");
    const [accountInterestRate, setAccountInterestRate] = useState("2");
    const [accountStatus, setAccountStatus] = useState("OPERATIVE");
    const [startStatementDate, setStartStatementDate] = useState("01/10/2021");
    const [endStatementDate, setEndStatementDate] = useState("31/03/2022");
    const [hideStartStatementDate, setHideStartStatementDate] = useState("2021-10-01");
    const [hideEndStatementDate, setHideEndStatementDate] = useState("2022-03-31");
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const Transactions = useSelector(state => state.Transactions.Transactions);
    const User = useSelector(state => state.User.User);
    const dispatch = useDispatch();
    const TransactionAmount = useSelector(state => state.TransactionAmount.TransactionAmount);

    const getBankTransactions = async (value) => {

        try {

            const res = await axios.get(`${Host}/api/user/transaction/jamuna_bank`, {
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

        getTransectionsAmounts()
        getBankTransactions()

    }, [])

    console.log(Transactions)


    return (
        <div className="p-5">
            {
                editMode ?
                    <div className='absolute top-5 right-0 print:hidden'>
                        <button onClick={GenerateTranjections} className="bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700 ">Save</button>
                        <button onClick={toggleEditMode} className="bg-red-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-red-700 ">Cencel</button>
                    </div>
                    :
                    <div className='absolute top-5 right-0 print:hidden'>
                        <button onClick={toggleEditMode} className=' bg-blue-500 px-2 py-[6px] rounded text-white hover:bg-blue-700'>Edit</button>
                        <button onClick={printWebPage} className=' bg-green-500 ml-2 px-2 py-[6px] rounded text-white hover:bg-green-700'>Print</button>
                    </div>
            }
            {/* topbar start */}
            <div className=" w-full flex justify-between">
                <div className=" w-2/3 flex items-center">
                    <div className=' mr-3'>
                        <img src={logo} alt="" className=' w-16 h-40' />
                    </div>
                    <div className=' ml-2 print:text-[12px]'>
                        <p className=" font-semibold print:font-medium text-lg print:text-base">Jamuna Bank Lid</p>
                        {
                            editMode ?
                                <input type="text" placeholder='Branch Name' value={branchName} onChange={(e) => setBranchName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :
                                <p className=" font-semibold print:font-normal my-1 print:my-0 capitalize">{branchName}</p>
                        }
                        {
                            editMode ?
                                <input type="text" placeholder='Branch Code' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :
                                <p className=" font-semibold print:font-normal my-1 print:my-0 capitalize">{branchAddress}</p>
                        }

                        {
                            editMode ?
                                <input type="text" placeholder='Branch Address' value={branchPhone} onChange={(e) => setBranchPhone(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :
                                <p className=" font-semibold print:font-normal my-1 print:my-0">Phone: {branchPhone}</p>
                        }
                        {
                            editMode ?
                                <input type="text" placeholder='Branch Fax' value={branchFax} onChange={(e) => setBranchFax(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                :
                                <p className=" font-semibold print:font-normal my-1 print:my-0">Fax: {branchFax}</p>
                        }
                    </div>
                </div>
                <div className=" w-1/3 print:text-[12px]">

                    <p className=" font-semibold text-center text-xl print:text-lg mb-10 print:mb-5">STATEMENT OF ACCOUNT</p>
                    <div className=" flex justify-between">
                        <span className=" font-medium print:font-normal">Account opening date:</span>
                        {
                            editMode ?
                                <input type="text" placeholder='Account opening date' value={accountOpeningDate} onChange={(e) => setAccountOpeningDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :

                                <span className=" font-medium print:font-normal">{accountOpeningDate}</span>
                        }
                    </div>
                    <div className=" flex justify-between my-1">
                        <span className=" font-medium print:font-normal">Maturity date:</span>
                        {
                            editMode ?
                                <input type="text" placeholder='Account opening date' value={accountMatureDate} onChange={(e) => setAccountMatureDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :

                                <span className=" font-medium print:font-normal">{accountMatureDate}</span>
                        }
                    </div>
                    <div className=" flex my-1">
                        <span className=" font-medium print:font-normal">Currency code:</span>
                        {
                            editMode ?
                                <input type="text" placeholder='Account opening date' value={accountCurrency} onChange={(e) => setAccountCurrency(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :

                                <span className=" font-medium print:font-normal ml-1">{accountCurrency}</span>
                        }
                    </div>
                    <div className=" flex my-1">
                        <span className=" font-medium print:font-normal">Interest/Profite Rate:</span>
                        {
                            editMode ?
                                <input type="text" placeholder='Account opening date' value={accountInterestRate} onChange={(e) => setAccountInterestRate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :

                                <span className=" font-medium print:font-normal ml-1">{accountInterestRate}</span>
                        }
                    </div>
                </div>
            </div>

            {/* topbar end */}

            {/* mid start */}

            <div className=" w-full flex justify-between items-end print:text-[12px]">
                <div className=" w-2/3">
                    {
                        editMode ?
                            <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            :
                            <p className=" font-semibold print:font-normal my-1 print:text-[10px] print:my-0 uppercase">{accountType} Account</p>
                    }
                    {
                        editMode ?
                            <input type="text" placeholder='Account Number' value={accountHoldersName} onChange={(e) => setAccountHoldersName(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none block' />
                            :
                            <p className=" font-semibold print:font-normal my-1 print:text-[10px] print:my-0 uppercase">{accountHoldersName}</p>
                    }
                    {
                        editMode ?
                            <input type="text" placeholder='Account Holders Address' value={accountHoldersAddress} onChange={(e) => setAccountHoldersAddress(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none block' />
                            :
                            <p className=" font-semibold print:font-normal my-1 print:text-[10px] print:my-0 uppercase">{accountHoldersAddress}</p>
                    }

                </div>
                <div className=" w-1/3">
                    {
                        editMode ?
                            <div>
                                <div className=' flex items-center'>
                                    <span className=' font-semibold mr-2'>Status</span>
                                    <input type="text" placeholder='Account Number' value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
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

                            <p className=" font-semibold print:font-normal my-1 print:my-0">Status: <span className=' uppercase'>{accountStatus}</span></p>
                    }
                </div>
            </div>

            <div className=" mt-5 print:text-[12px]">
                {
                    editMode ?
                        <input type="text" placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        :
                        <p className=" font-semibold print:font-normal my-1 print:text-[10px] print:my-0">Account Number: <span className=' uppercase'>{accountNumber}</span></p>
                }
                {
                    editMode ?

                        <div className=" leading-7 print:leading-[22px]"><span>Statement Date:</span> <input type="date" placeholder='Start stetment date' value={hideStartStatementDate} onChange={(e) => statementDateChange("startStatementDate", e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /> to <input type="date" placeholder='Start stetment date' value={hideEndStatementDate} onChange={(e) => statementDateChange("endStatementDate", e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /></div>
                        :
                        <p className=" leading-7 print:text-[10px] print:leading-[22px]">Statement Date: {startStatementDate} to {endStatementDate}</p>
                }

            </div>
            {/* mid end */}

            {/* info start */}

            <div className=" w-full mt-10 print:mt-5">
                <div className=' w-full flex justify-end print:hidden'>
                </div>
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
                <p className=' font-medium text-center print:text-[9px] mt-2'>This is a computer generated statement and does not require any signature</p>
            </div>

            {/* info end */}
        </div>
    )
}

export default JamunaBankOne