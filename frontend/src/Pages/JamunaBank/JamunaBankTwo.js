import axios from 'axios';
import commaNumber from 'comma-number';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../../Data';
import { fatchSuccess } from '../../Redux/Banks_slice';
import { TransactionAmountFatchSuccess } from '../../Redux/TransactionAmount_slice';
import { transactionsFatchSuccess } from '../../Redux/Transactions_slice';
import GenerateRandomTranjections from '../../Utils/GenerateRandomTransaction';

function JamunaBankTwo() {

    const [randomTransictions, setRandomTransictions] = useState([])
    const [initialBranchCode, setInitialBranchCode] = useState(32)
    const [transactionQuantity, setTransactionQuantity] = useState(40);
    const [initialBalance, setInitialBalance] = useState(400000);
    const [editMode, setEditMode] = useState(false);
    const [branchName, setBranchName] = useState("Shantinagar Branch");
    const [branchAddress, setBranchAddress] = useState("Green City Edge, 89, Kakrail ,Dhaka-1000");
    // const [branchPhone, setBranchPhone] = useState("8355179");
    // const [branchFax, setBranchFax] = useState("8355649");
    const [statementGenarationDate, setStatementGenarationDate] = useState("2020-01-01");
    const [receptNo, setReceptNo] = useState("546465");
    const [statementExportDate, setStatementExportDate] = useState("2020-01-01");
    const [accountType, setAccountType] = useState("Saving");
    const [accountNumber, setAccountNumber] = useState("0009-03100007098");
    const [accountLimit, setAccountLimit] = useState(200000);
    const [accountHoldersName, setAccountHoldersName] = useState("MOHD MOMINUR RAHMAN");
    const [accountHoldersAddress, setAccountHoldersAddress] = useState("33/1 SARAT GUPTA ROAD NARINDA DHAKA");
    // const [accountOpeningDate, setAccountOpeningDate] = useState("04/08/2004");
    const [accountCurrency, setAccountCurrency] = useState("TK");
    const [accountMatureDate, setAccountMatureDate] = useState("01-April-2022");
    const [accountInterestRate, setAccountInterestRate] = useState("2");
    const [accountStatus, setAccountStatus] = useState("OPERATIVE");
    const [startStatementDate, setStartStatementDate] = useState("01/10/2021");
    const [endStatementDate, setEndStatementDate] = useState("31/03/2022");
    const [hideStartStatementDate, setHideStartStatementDate] = useState("2021-10-01");
    const [hideEndStatementDate, setHideEndStatementDate] = useState("2022-03-31");
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const [routingNumber, setRoutingNumber] = useState("0123456789");
    const Transactions = useSelector(state => state.Transactions.Transactions);
    const [ucicId, setUcicId] = useState("29304875243789");
    const [accountHolderPostCode, setAccountHolderPostCode] = useState("1234");
    const [accountHolderCity, setAccountHolderCity] = useState("");
    const [accountHolderState, setAccountHolderState] = useState("Dhaka");
    const [accountHolderEmail, setAccountHolderEmail] = useState("example@gmail.com");
    const [accountHolderPhone, setAccountHolderPhone] = useState("0123456789");
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


    return (
        <div className=' w-full min-h-screen p-5 print:p-0'>
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
            <div className=' flex justify-between'>
                <p className=' font-semibold text-lg print:text-sm'>Jamuna Bank Ltd</p>
                <p className=' font-semibold text-xl print:text-sm '>STATEMENT OF ACCOUNT</p>
                <p className=' font-semibold text-3xl print:text-xl text-gray-600 '>JAMUNABANK</p>
            </div>

            {/* top section start */}
            <div className=' flex justify-between mt-5 print:mt-2'>
                <div className='w-[49.5%]'>
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:font-medium print:text-[10px]'>Branch name</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Branch Name' value={branchName} onChange={(e) => setBranchName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:font-medium print:text-[10px]'>Branch name</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase  print:text-[10px]'>{branchName}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:font-medium print:text-[10px]'>Branch Address</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Branch Address' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:font-medium print:text-[10px]'>Branch Address</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{branchAddress}</p>
                            </div>
                    }
                    <div className=' py-2'>
                        {
                            editMode ?
                                <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium '>Account no</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Account Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium '>Account no</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 uppercase print:text-[10px]'>{accountNumber}</p>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium'>Ucic id</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Ucic Id' value={ucicId} onChange={(e) => setUcicId(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium'>Ucic id</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 uppercase print:text-[10px]'>{ucicId}</p>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium'>Account type</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium'>Account type</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 capitalize'>{accountType}</p>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' w-full flex  py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium'>name</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Account Holder Name' value={accountHoldersName} onChange={(e) => setAccountHoldersName(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold print:font-medium'>name</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 uppercase print:text-[10px]'>{accountHoldersName}</p>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' w-full flex  py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold'>address</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Account Holders Address' value={accountHoldersAddress} onChange={(e) => setAccountHoldersAddress(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                    <div className=' w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase print:text-[10px] font-semibold'>address</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 uppercase print:text-[10px]'>{accountHoldersAddress}</p>
                                </div>
                        }
                    </div>
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>post code</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Post Code' value={accountHolderPostCode} onChange={(e) => setAccountHolderPostCode(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>Post Code</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountHolderPostCode}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex  py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>city</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Holder City' value={accountHolderCity} onChange={(e) => setAccountHolderCity(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>city</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountHolderCity}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>state</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Holders State' value={accountHolderState} onChange={(e) => setAccountHolderState(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>state</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountHolderState}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>email id</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Holders email' value={accountHolderEmail} onChange={(e) => setAccountHolderEmail(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>email id</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 lowercase print:text-[10px]'>{accountHolderEmail}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>phone number</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Holders email' value={accountHolderPhone} onChange={(e) => setAccountHolderPhone(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px] print:text-[10px]'>
                                <div className=' w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase print:text-[10px] font-semibold'>phone number</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountHolderPhone}</p>
                            </div>
                    }
                </div>
                <div className='w-[49.5%]'>
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>routing number/micr</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Rounting Number' value={routingNumber} onChange={(e) => setRoutingNumber(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>routing number/micr</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{routingNumber}</p>
                            </div>
                    }

                    {
                        editMode ?

                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between'>
                                    <p className='uppercase font-semibold print:text-[10px]'>statement from</p>
                                    <span>:</span>
                                </div>
                                <div>
                                    <input type="date" placeholder='Start stetment date' value={hideStartStatementDate} onChange={(e) => statementDateChange("startStatementDate", e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                    to
                                    <input type="date" placeholder='Start stetment date' value={hideEndStatementDate} onChange={(e) => statementDateChange("endStatementDate", e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none' />
                                </div>
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>statement from</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>01-April-2022 <span className=' font-semibold print:text-[10px] print:font-medium'>TO</span> 22-May-2022</p>
                            </div>
                    }
                    {
                        editMode ?

                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>maturity date</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Mature Date' value={accountMatureDate} onChange={(e) => setAccountMatureDate(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :

                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>maturity date</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 print:text-[10px]'>{accountMatureDate}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>account status</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Status' value={accountStatus} onChange={(e) => setAccountStatus(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>account status</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountStatus}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>Limit amount</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Limit' value={accountLimit} onChange={(e) => setAccountLimit(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>Limit amount</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountLimit}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>currancy</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Account Currancy' value={accountCurrency} onChange={(e) => setAccountCurrency(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>currancy</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 uppercase print:text-[10px]'>{accountCurrency}</p>
                            </div>
                    }
                    {
                        editMode ?
                            <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>statement of generation</p>
                                    <span>:</span>
                                </div>
                                <input type="text" placeholder='Statement Genaration Date' value={statementGenarationDate} onChange={(e) => setStatementGenarationDate(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                            </div>
                            :
                            <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                <div className='w-1/2 flex justify-between mr-2'>
                                    <p className='uppercase font-semibold print:text-[10px]'>statement of generation</p>
                                    <span>:</span>
                                </div>
                                <p className=' w-1/2 print:text-[10px]'>{statementGenarationDate}</p>
                            </div>
                    }
                    <div className=' py-1'>
                        {
                            editMode ?
                                <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>interest/profit rate %</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Interest Rate' value={accountInterestRate} onChange={(e) => setAccountInterestRate(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>interest/profit rate %</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 print:text-[10px]'>{accountInterestRate}</p>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>recept no.</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Recept No' value={receptNo} onChange={(e) => setReceptNo(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>recept no.</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 print:text-[10px]'>{receptNo}</p>
                                </div>
                        }
                        {
                            editMode ?
                                <div className=' w-full flex py-1 print:py-0 print:leading-[14px]'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>expary date</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" placeholder='Expery Date' value={statementExportDate} onChange={(e) => setStatementExportDate(e.target.value)} className=' rounded p-1 print:text-[10px] my-[2px] border border-blue-500 focus:outline-none ' />
                                </div>
                                :
                                <div className=' w-full flex justify-between py-1 print:py-0 print:leading-[14px]'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>expary date</p>
                                        <span>:</span>
                                    </div>
                                    <p className=' w-1/2 print:text-[10px]'>{statementExportDate}</p>
                                </div>
                        }
                        {
                            editMode &&
                            <div>
                                <div className=' flex items-center my-1'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>initialBalance</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>

                                <div className=' flex items-center my-1'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>Initial Branch Code</p>
                                        <span>:</span>
                                    </div>

                                    <input type="text" value={initialBranchCode} onChange={(e) => setInitialBranchCode(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                <div className=' flex items-center'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>Number of row</p>
                                        <span>:</span>
                                    </div>
                                    <input type="text" value={transactionQuantity} onChange={(e) => setTransactionQuantity(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                <div className=' flex items-center'>
                                    <div className='w-1/2 flex justify-between mr-2'>
                                        <p className='uppercase font-semibold print:text-[10px]'>Transactions</p>
                                        <span>:</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* top section end */}
            {/* mid section start */}
            <div className=' w-full mt-5'>
                <div className=' flex w-full'>
                    <div className='flex w-[20%] items-center border px-1 border-r-0 font-semibold print:text-[10px]'>
                        <p>Statement Summary:</p>
                    </div>
                    <table className=' w-[80%] print:text-[10px]'>
                        <thead>
                            <tr>
                                <th className=' font-medium  border'>Opening Banance</th>
                                <th className=' font-medium border'>Total Dabits</th>
                                <th className=' font-medium border'>Total Credits</th>
                                <th className=' font-medium border'>Closing Blance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className=' text-center border p-1'>{commaNumber(initialBalance)}</td>
                                <td className=' text-center border p-1'>{commaNumber(totalWithdrawal)}</td>
                                <td className=' text-center border p-1'>{commaNumber(totalDeposit)}</td>
                                <td className=' text-center border p-1'>{randomTransictions.length && commaNumber(randomTransictions[randomTransictions.length - 1].balance)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* mid section end */}

            {/* table section start */}

            <div className=' w-full mt-5'>
                <table className=' w-full'>
                    <thead>
                        <tr className='print:text-[10px]'>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Trans Date</td>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Value Date</td>
                            <td className=' font-medium border p-2 print:p-1 text-center w-[27%]'>Particulars</td>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Ref/Cheque No</td>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Debit</td>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Credit</td>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Balance</td>
                            <td className=' font-medium border p-2 print:p-1 text-center'>Tran Branch</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className=' print:text-[10px]'>
                            <td className=' border p-2 print:p-1 text-center'></td>
                            <td className=' border p-2 print:p-1'></td>
                            <td className=' border p-2 print:py-[2px] print:px-0 font-medium w-[27%]'>Opening Balance</td>
                            <td className=' border p-2 print:p-1'></td>
                            <td className=' border p-2 print:p-1 text-right'></td>
                            <td className=' border p-2 print:p-1 text-right'></td>
                            <td className=' border p-2 print:p-1 text-right'>{commaNumber(initialBalance)}</td>
                            <td className=' border p-2 print:p-1 text-center'></td>
                        </tr>
                        {
                            randomTransictions.length > 0 && randomTransictions.map((item, index) => {
                                return (
                                    <tr className=' print:text-[10px]'>
                                        <td className=' border p-2 print:p-1 text-center'>{item.date} {item.time}</td>
                                        <td className=' border p-2 print:p-1'>{item.date}</td>
                                        <td className=' border p-2 print:py-[2px] print:px-0 w-[27%] print:leading-[10px]'>{item.particular}</td>
                                        <td className=' border p-2 print:p-1'></td>
                                        <td className=' border p-2 print:p-1 text-right'>{item.withdrawal > 0 && commaNumber(item.withdrawal)}</td>
                                        <td className=' border p-2 print:p-1 text-right'>{item.deposit > 0 && commaNumber(item.deposit)}</td>
                                        <td className=' border p-2 print:p-1 text-right'>{commaNumber(item.balance)}</td>
                                        <td className=' border p-2 print:p-1 text-center'>{item.branchCode}</td>
                                    </tr>
                                )
                            })
                        }

                        <tr className=' print:text-[10px]'>
                            <td className=' border p-2 print:p-1 text-center'>Total</td>
                            <td className=' '></td>
                            <td className=' w-[27%]'></td>
                            <td></td>
                            <td className=' border p-2 print:p-1 text-center'>{commaNumber(totalWithdrawal)}</td>
                            <td className=' border p-2 print:p-1 text-center'>{commaNumber(totalDeposit)}</td>
                            <td></td>
                            <td></td>
                        </tr>

                    </tbody>
                    <tfoot class="table-footer-group" id="pageFooter">
                        <tr>
                            <td class=" " colspan="8">
                                <div className=' w-full'>
                                    <p className=' text-center font-medium pt-5 print:text-[10px]'>Thanks for banking with us.</p>
                                    <hr className=' h-[2px] bg-gray-400 w-full' />
                                    <p className=' print:text-[9px]'>The Customer should examine promptly the statement received and notify the bank in writing within 15 calendar days after the statement is maild,transmitted, or otherwise made available to customer of any errors,discrepancies or irregularities detected failng,failing which the statement will deem to be correct. This is a computer generated statement and does not require any signature.</p>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                {/* <p className=' font-medium text-center print:text-[8px] mt-2'>This is a computer generated statement and does not require any signature</p> */}
                {/* table section end */}
            </div>
        </div>
    )
}

export default JamunaBankTwo