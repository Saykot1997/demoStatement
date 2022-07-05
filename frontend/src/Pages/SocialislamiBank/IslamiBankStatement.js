import axios from 'axios';
import commaNumber from 'comma-number';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../../Data';
import { TransactionAmountFatchSuccess } from '../../Redux/TransactionAmount_slice';
import { transactionsFatchSuccess } from '../../Redux/Transactions_slice';
import GenerateRandomTranjections from '../../Utils/GenerateRandomTransaction';
import logo from "../../Photos/islami_bank/islami_bank_logo.png";
import bankSil from "../../Photos/islami_bank/islami_bank_sil.png";
import GetFormatedDate from '../../Utils/GetFormatedDate';
import EditButtonComponent from '../../Components/EditButtonComponent';
import changeFields from '../../Utils/ChangeFields';

function IslamiBankStatement() {

    const [randomTransictions, setRandomTransictions] = useState([])
    const [initialBranchCode, setInitialBranchCode] = useState(32)
    const [transactionQuantity, setTransactionQuantity] = useState(40);
    const [initialBalance, setInitialBalance] = useState(700000);
    const [editMode, setEditMode] = useState(false);
    const [printDate, setPrintDate] = useState("01/01/2020");
    const [branchName, setBranchName] = useState("Garib-E-Newaz Avenue Branch");
    const [branchAddress, setBranchAddress] = useState("50,Garib-E-New Avenue,Sector-13,Uttra");
    const [openingDate, setOpeningDate] = useState("01/01/2020");
    const [lastTRDate, setLastTRDate] = useState("01/01/2020");
    const [reportGenerateUser, setReportGenerateUser] = useState("");
    const [accountType, setAccountType] = useState("Mudaraba Savings Deposit-Client");
    const [accountNumber, setAccountNumber] = useState("0009-03100007098");
    const [accountHoldersName, setAccountHoldersName] = useState("MOHD MOMINUR RAHMAN");
    const [accountHoldersAddress, setAccountHoldersAddress] = useState("33/1 SARAT GUPTA ROAD NARINDA DHAKA");
    const [accountHoldersPhone, setAccountHoldersPhone] = useState("8355179");
    const [accountStatus, setAccountStatus] = useState("ACTIVE");
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

            const res = await axios.get(`${Host}/api/user/transaction/islamic_bank`, {
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

        const allData = GenerateRandomTranjections(hideStartStatementDate, hideEndStatementDate, Transactions, transactionQuantity, initialBalance, TransactionAmount.ATM, TransactionAmount.Cheque, "islami_bank");
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


    return (
        <div className=' w-full min-h-screen p-10 print:p-0 font-nuosu'>

            <EditButtonComponent editMode={editMode} toggleEditMode={toggleEditMode} GenerateTranjections={GenerateTranjections} />

            <table className='w-full'>
                <thead class=" table-header-group w-full">
                    <tr className=' w-full'>
                        <th class="report-header-cell w-full" colspan="7">
                            <div className=' w-full'>
                                <div className='w-full flex justify-between'>
                                    <div className=' w-[40%]'>
                                        <img src={logo} alt="" className=' w-32' />
                                    </div>
                                    <div className=' w-[60%] text-center'>
                                        <p className='text-2xl print:text-xl font-semibold text-gray-900'>Social Islami Bank Ltd.</p>
                                        {
                                            editMode ?
                                                <div className=' flex items-center'>
                                                    <span className=' font-semibold'>Branch Name :</span>
                                                    <input type="text" placeholder='Branch Name' value={branchName} onChange={(e) => setBranchName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                </div>
                                                :

                                                <p className=' print:text-base text-gray-900'>{branchName}</p>
                                        }
                                        {
                                            editMode ?
                                                <div className=' flex items-center'>
                                                    <span className=' font-semibold'>Branch Address :</span>
                                                    <input type="text" placeholder='Branch Address' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                                </div>
                                                :

                                                <p className=' font-semibold print:text-sm text-gray-900'>{branchAddress}</p>
                                        }
                                    </div>
                                    <div className=' w-[40%] flex justify-end'>
                                        {
                                            editMode ?
                                                <div className=''>
                                                    <p className=' text-sm font-semibold print:font-normal print:text-right'>Print Date :
                                                        <input type="text" placeholder='Print date' value={printDate} onChange={(e) => setPrintDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                                    </p>
                                                    <p className=' text-sm font-semibold print:font-normal mr-14'>Report Generated User:  <input type="text" placeholder='Report Generate User' value={reportGenerateUser} onChange={(e) => setReportGenerateUser(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' /></p>
                                                </div>
                                                :

                                                <div className=' w-full font-normal mt-3'>
                                                    <div className=' text-right leading-[14px]'>
                                                        <span className=' text-sm print:text-[11px]'>Print Date</span>
                                                        <span className=' mx-1 '>:</span>
                                                        <span className=' text-sm print:text-[11px]'>{printDate}</span>
                                                    </div>
                                                    <div className=' text-right leading-[14px]'>
                                                        <span className=' text-sm print:text-[11px]'>Report Generated User</span>
                                                        <span className=' mx-1 '>:</span>
                                                        <span className=' text-sm print:text-[11px]'>{reportGenerateUser}</span>
                                                    </div>
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className=' flex justify-center py-5 print:pt-2 print:pb-4'>
                                    <span className=' border-b border-gray-900 font-semibold text-lg print:text-base text-gray-900'>A/C Statement</span>
                                </div>
                            </div>

                            <div className=' w-full flex font-normal'>
                                <div className=' w-1/2 pr-16 print:text-[12px]'>
                                    {
                                        editMode ?
                                            <div className=' my-1'>
                                                <span className=' inline-block w-24 font-semibold print:font-semibold'>A/C No</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :
                                            <div className=' flex'>
                                                <div className=' flex justify-between w-24'>
                                                    <span className='font-semibold'>A/C No</span>
                                                    <span>:</span>
                                                </div>
                                                <div className=' text-left ml-1 w-[calc(100%-theme(space.20))]'>
                                                    <span className=''>{accountNumber}</span>
                                                </div>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=' my-1'>
                                                <span className=' inline-block w-24 font-semibold print:font-semibold'>A/C Name</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" placeholder='Account Holder Name' value={accountHoldersName} onChange={(e) => setAccountHoldersName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :
                                            <div className=' flex'>
                                                <div className=' flex justify-between w-24'>
                                                    <span className='font-semibold'>A/C Name</span>
                                                    <span className=''>:</span>
                                                </div>
                                                <div className='  text-left ml-1 w-[calc(100%-theme(space.20))]'>
                                                    <span className=''>{accountHoldersName}</span>
                                                </div>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div>
                                                <span className=' inline-block w-24 font-semibold print:font-semibold'>Address</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" placeholder='Account Holder Address' value={accountHoldersAddress} onChange={(e) => setAccountHoldersAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :
                                            <div className=' flex w-full'>
                                                <div className=' flex justify-between w-24'>
                                                    <span className='font-semibold'>Address</span>
                                                    <span>:</span>
                                                </div>
                                                <div className=' text-left ml-1 w-[calc(100%-theme(space.20))]'>
                                                    <span className=''>{accountHoldersAddress}</span>
                                                </div>
                                            </div>
                                    }
                                </div>
                                <div className=' w-1/2 print:text-[12px]'>
                                    {
                                        editMode ?

                                            <div className=" leading-7 print:leading-[22px] flex">
                                                <span className='inline-block w-32 text-right font-semibold print:font-semibold'>Statement Date</span>

                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="date" placeholder='Start stetment date' value={hideStartStatementDate} onChange={(e) => statementDateChange("startStatementDate", e.target.value)} className=' rounded px-1 py-[1px] my-[2px] border border-blue-500 focus:outline-none' />

                                                to

                                                <input type="date" placeholder='Start stetment date' value={hideEndStatementDate} onChange={(e) => statementDateChange("endStatementDate", e.target.value)} className=' rounded px-1 py-[1px] my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :

                                            <div className='flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Date From</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <p className=' font-semibold print:font-semibold'> <span> {startStatementDate}</span> To <span>{endStatementDate}</span></p>
                                            </div>
                                    }
                                    {
                                        editMode ?

                                            <div className=' my-[2px] flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Type of Account</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :
                                            <div className='flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Type of Account</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <p className=''>{accountType}</p>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div>
                                                <div className=' my-[2px] flex'>
                                                    <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Opening Date</span>
                                                    <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                    <input type="text" placeholder='Opening Date' value={openingDate} onChange={(e) => setOpeningDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                                </div>
                                                <div className=' my-[2px] flex'>
                                                    <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Last Tr.Date</span>
                                                    <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                    <input type="text" placeholder='Last Tr.Date' value={lastTRDate} onChange={(e) => setLastTRDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                                </div>
                                            </div>
                                            :
                                            <div className=''>
                                                <div className='flex'>
                                                    <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Opening Date</span>
                                                    <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                    <span className=' uppercase'>{openingDate}</span>
                                                </div>
                                                <div className='flex'>
                                                    <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Last Tr.Date</span>
                                                    <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                    <span className=' uppercase'>{lastTRDate}</span>
                                                </div>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=' my-[2px] flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Phone</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>

                                                <input type="text" placeholder='Phone' value={accountHoldersPhone} onChange={(e) => setAccountHoldersPhone(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />

                                            </div>
                                            :
                                            <div className=' my-[2px] flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Phone</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <span className=''>{accountHoldersPhone}</span>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=' my-[2px] flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Account Status</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" placeholder='Account Number' value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :
                                            <div className=' my-[2px] flex'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Account Status</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <span className=' uppercase'>{accountStatus}</span>
                                            </div>
                                    }

                                    {
                                        editMode &&
                                        <div>
                                            <div className=' flex my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>initialBalance</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            <div className=' flex my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Initial Branch Code</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" value={initialBranchCode} onChange={(e) => setInitialBranchCode(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>

                                            <div className=' flex my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Number of Rows</span>
                                                <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                                                <input type="text" value={transactionQuantity} onChange={(e) => setTransactionQuantity(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            <div className=' flex items-center'>
                                                <div className='flex justify-between mr-2'>
                                                    <p className='uppercase font-semibold print:text-[10px]'>Transactions</p>
                                                    <span>:</span>
                                                </div>
                                            </div>

                                        </div>
                                    }
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>

                <thead>
                    <tr className=' text-gray-900'>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2'>Date</td>
                        <td className=' font-semibold print:px-3 py-0 print:text-[12px] border p-2'>Code</td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2'>Cheque/Instr.</td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 w-[40%]'>Particulars</td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 text-right w-[15%]'>Debit</td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 text-right w-[15%]'>Credit</td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 text-right w-[15%]'>Balance</td>
                    </tr>
                </thead>
                <tbody>
                    {/* className='bg-water-mark bg-right-top bg-75% bg-no-repeat' */}
                    <tr className=' text-gray-900'>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2'></td>
                        <td className=' font-semibold print:px-3 py-0 print:text-[12px] border p-2'></td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2'></td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2'>Balance B/F</td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 text-right'></td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 text-right'></td>
                        <td className=' font-semibold print:px-1 py-0 print:text-[12px] border p-2 text-right'>{commaNumber(initialBalance)}</td>
                    </tr>

                    {
                        randomTransictions.length > 0 && randomTransictions.map((item, index) => {

                            return (
                                <tr className=' print:leading-[14px] align-text-top'>
                                    <td className=' border p-2 print:py-0 print:px-1 print:text-[11px]'>
                                        {
                                            editMode ?
                                                <input type="text" value={item.date} onChange={(e) => changeFields(e.target.value, index, "date", randomTransictions, setRandomTransictions)} placeholder='Date' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                :
                                                <span>{item.date}</span>
                                        }
                                    </td>
                                    <td className=' border p-2 print:py-0 print:px-3 print:text-[11px]'>{
                                        item.type === 'credit' && item.method === "cheque" &&
                                        <span>101</span>

                                        || item.type === 'credit' && item.method === "cash" &&
                                        <span>101</span>

                                        || item.type === 'credit' && item.method === "online" &&
                                        <span>102</span>

                                        || item.type === 'debit' && item.method === "cheque" &&
                                        <span>201</span>

                                        || item.type === 'debit' && item.method === "cash" &&

                                        <span>201</span>

                                        || item.type === 'debit' && item.method === "online" &&
                                        <span>202</span>

                                        || item.type === 'debit' && item.method === "atm" &&
                                        <span>202</span>


                                    }</td>
                                    <td className=' border p-2 print:py-0 print:px-1 print:text-[11px]'>
                                        {
                                            editMode ?
                                                <input type="text" value={item.cheque} onChange={(e) => changeFields(e.target.value, index, "cheque", randomTransictions, setRandomTransictions)} placeholder='Date' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                :
                                                <span>{item.cheque}</span>
                                        }
                                    </td>
                                    <td className=' border p-2 print:py-0 print:px-[6px] print:text-[11px]'>

                                        {
                                            editMode ?
                                                <input type="text" value={item.particular} onChange={(e) => changeFields(e.target.value, index, "particular", randomTransictions, setRandomTransictions)} placeholder='Date' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                                :
                                                <p>{item.particular} <span className=' capitalize'>on Date {GetFormatedDate(item.date)}</span></p>
                                        }
                                    </td>
                                    <td className=' border p-2 print:py-0 print:px-1 print:text-[11px] text-right'>{item.withdrawal > 0 && commaNumber(item.withdrawal)}</td>
                                    <td className=' border p-2 print:py-0 print:px-1 print:text-[11px] text-right'>{item.deposit > 0 && commaNumber(item.deposit)}</td>
                                    <td className=' border p-2 print:py-0 print:px-1 print:text-[11px] text-right'>{commaNumber(item.balance)}</td>
                                </tr>
                            )
                        })
                    }

                    <tr>
                        <td className=" text-sm p-2"></td>
                        <td className=" text-center text-sm p-2"></td>
                        <td className=" text-center text-sm p-2"></td>
                        <td className=" text-right p-2 font-semibold print:font-semibold print:text-[12px]">Total : </td>
                        <td className=" text-right p-2 font-semibold print:font-semibold print:text-[12px]">
                            <div className=' w-full p-1'>
                                <p className=' border-y border-gray-700'>{commaNumber(totalWithdrawal)}</p>
                            </div>
                        </td>
                        <td className=" text-right font-semibold print:font-semibold print:text-[12px] p-2">
                            <div className=' w-full p-1'>
                                <p className=' border-y border-gray-700'>{commaNumber(totalDeposit)}</p>
                            </div>
                        </td>
                        <td className=" text-center text-sm p-2"></td>
                    </tr>
                </tbody>
                <tfoot class="table-footer-group">
                    <tr>
                        <td class=" " colspan="7">
                            <div className=' w-full text-sm text-center mt-5'>
                                <p className=' font-semibold'>101 : Cash Credit , 102 : Transfer Credit, 103 : Clearing Credit, 201 : Cash Debit, 202 : Cash Debit, 203: Clearing Debit</p>
                                <p className=' font-semibold text-[12px]'>**We receive Dhaka WASA, DESCO, BRTA, Student tuition and e-GP/e-Tendering bills/fees at our branches through online.</p>
                                <p className=' text-[12px]'>Prepared by ABABIL.Developed by : Millennium Information Solution Limited</p>
                                <div className=' flex justify-end'>
                                    <img src={bankSil} alt="" className=' w-32 -translate-y-20' />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default IslamiBankStatement