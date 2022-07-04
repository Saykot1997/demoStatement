import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import logo from "../../Photos/uco_bank/logo.jpg"
import axios from 'axios';
import { Host } from "../../Data"
import { transactionsFatchSuccess } from '../../Redux/Transactions_slice';
import commaNumber from 'comma-number'
import GenerateRandomTranjections from '../../Utils/GenerateRandomTransaction';
import { TransactionAmountFatchSuccess } from '../../Redux/TransactionAmount_slice';
import sil from "../../Photos/uco_bank/sil.png"
import EditButtonComponent from '../../Components/EditButtonComponent';
import changeFields from '../../Utils/ChangeFields';

function UCOBankTransaction() {

    const [currancySuffix, setCurrancySuffix] = useState("Cr")
    const [randomTransictions, setRandomTransictions] = useState([])
    const [initialBranchCode, setInitialBranchCode] = useState(32)
    const [transactionQuantity, setTransactionQuantity] = useState(40);
    const [initialBalance, setInitialBalance] = useState(700000);
    const [editMode, setEditMode] = useState(false);
    const [branchName, setBranchName] = useState("PUTHUPPARIYARAM (3329)");
    const [branchAddress, setBranchAddress] = useState("6/657,ARAVIND ARCADE, GROUND FLOOR, PURHUPPARIYARAM P.O., PALAKKAD");
    const [branchState, setBranchState] = useState("PALAKKAD");
    const [branchCity, setBranchCity] = useState("KERALA");
    const [branchPin, setBranchPin] = useState("678731");
    const [IFSCCode, setIFSCCode] = useState("UCBA0003329");
    const [MICRCode, setMICRCode] = useState("678028003");
    const [CKYCNumber, setCKYCNumber] = useState("10026316932351");
    const [branchPhone, setBranchPhone] = useState("04912553329");
    const [freeHelpLine, setFreeHelpLine] = useState("1800 103 0123")
    const [todayDate, setTodayDate] = useState("27-06-2022")
    const [accountType, setAccountType] = useState("SAVINGS-GENERAL-RURAL");
    const [accountNumber, setAccountNumber] = useState("33290110017913");
    const [accountHoldersName, setAccountHoldersName] = useState("SANKARAN P S");
    const [accountHolderVilage, setAccountHolderVilage] = useState("VALIYAKATTIUPARAMBU")
    const [accountHolderState, setAccountHolderState] = useState("VALLIKKODE PALAKKAD")
    const [accountHolderThana, setAccountHolderThana] = useState("PALGHAT")
    const [accountHolderCity, setAccountHolderCity] = useState("KERALA-678594")
    const [accountHolderCuntry, setAccountHolderCuntry] = useState("INDIA")
    const [accountCurrency, setAccountCurrency] = useState("INR");
    const [startStatementDate, setStartStatementDate] = useState("01-10-2021");
    const [endStatementDate, setEndStatementDate] = useState("31-03-2022");
    const [hideStartStatementDate, setHideStartStatementDate] = useState("2021-10-01");
    const [hideEndStatementDate, setHideEndStatementDate] = useState("2022-03-31");
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [currentFFDBalance, setCurrentFFDBalance] = useState("0")
    const [totalDeposit, setTotalDeposit] = useState(0);
    const Transactions = useSelector(state => state.Transactions.Transactions);
    const User = useSelector(state => state.User.User);
    const dispatch = useDispatch();
    const TransactionAmount = useSelector(state => state.TransactionAmount.TransactionAmount);

    const getBankTransactions = async (value) => {

        try {

            const res = await axios.get(`${Host}/api/user/transaction/uco_bank`, {
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

            setStartStatementDate(`${startStatementDateDay}-${startStatementDateMonth}-${startStatementDateYear}`);
            setHideStartStatementDate(`${startStatementDateYear}-${startStatementDateMonth}-${startStatementDateDay}`);

        } else if (option === "endStatementDate") {

            let endStatementDate = value.split("-");
            let endStatementDateYear = endStatementDate[0];
            let endStatementDateMonth = endStatementDate[1];
            let endStatementDateDay = endStatementDate[2];

            setEndStatementDate(`${endStatementDateDay}-${endStatementDateMonth}-${endStatementDateYear}`);
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



    const GetFormateDate = (date) => {

        if (date === undefined) {
            return null
        }

        let splitDate = date.split("/")

        return `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`
    }

    return (
        <div className="p-10 font-mono">

            <EditButtonComponent editMode={editMode} toggleEditMode={toggleEditMode} GenerateTranjections={GenerateTranjections} />

            <div className=' grid grid-cols-3 print:text-[11px] print:leading-[14px] font-Poppins pt-5'>
                <div>
                    <img src={logo} alt="" className=' w-48 -translate-y-5' />
                </div>
                <div className=''>
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span className=' font-semibold'>Branch Name :</span>
                                <input type="text" placeholder='Branch Name' value={branchName} onChange={(e) => setBranchName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :

                            <p className=''>{branchName}</p>
                    }
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span className=' font-semibold'>Branch Address :</span>
                                <input type="text" placeholder='Branch Address' value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :

                            <p className=''>{branchAddress}</p>
                    }
                    {
                        editMode ?
                            <div>

                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>Branch State :</span>
                                    <input type="text" placeholder='Branch State' value={branchState} onChange={(e) => setBranchState(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>Branch City :</span>
                                    <input type="text" placeholder='Branch City' value={branchCity} onChange={(e) => setBranchCity(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>Branch Pin :</span>
                                    <input type="text" placeholder='Branch Pin' value={branchPin} onChange={(e) => setBranchPin(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                            </div>
                            :

                            <div className=' flex '>
                                <span className=' mr-3'>{branchState}</span>
                                <span className=' mr-5'>{branchCity}</span>
                                <span>PIN: {branchPin}</span>
                            </div>
                    }
                </div>
                <div className=' pl-3'>
                    {
                        editMode ?

                            <div className=' flex items-center'>
                                <span className=' font-semibold'>IFSC Code :</span>
                                <input type="text" placeholder='IFSC Code' value={IFSCCode} onChange={(e) => setIFSCCode(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <div >
                                <span>IFSC Code</span>
                                <span className=' mx-1'>:</span>
                                <span>{IFSCCode}</span>
                            </div>
                    }
                    {
                        editMode ?

                            <div className=' flex items-center'>
                                <span className=' font-semibold'>MICR Code :</span>
                                <input type="text" placeholder='MICR Code' value={MICRCode} onChange={(e) => setMICRCode(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <div>
                                <span>MICR Code</span>
                                <span className=' mx-1'>:</span>
                                <span>{MICRCode}</span>
                            </div>
                    }
                    {
                        editMode ?

                            <div className=' flex items-center'>
                                <span className=' font-semibold'>Branch Phone :</span>
                                <input type="text" placeholder='Branch Phone' value={branchPhone} onChange={(e) => setBranchPhone(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <div>
                                <span>Branch Phone .</span>
                                <span className=' ml-1'>{branchPhone}</span>
                            </div>
                    }
                    {
                        editMode ?

                            <div className=' flex items-center'>
                                <span className=' font-semibold'>Total Free Help Line :</span>
                                <input type="text" placeholder='Total Free Help Line' value={freeHelpLine} onChange={(e) => setFreeHelpLine(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :
                            <div>
                                <span>Branch Phone :</span>
                                {/* <span>:</span> */}
                                <span>{freeHelpLine}</span>
                            </div>
                    }

                </div>
            </div>
            <div className=' flex  print:text-[11px]'>
                <div className=' w-[60%]'>
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span className=' font-semibold'>Account Type :</span>
                                <input type="text" placeholder='Account Type' value={accountType} onChange={(e) => setAccountType(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :

                            <p>TYPE: <span>{accountType}</span></p>
                    }
                    {
                        editMode ?
                            <div className=' flex items-center'>
                                <span className=' font-semibold'>CKYC NO :</span>
                                <input type="text" placeholder='Account Type' value={CKYCNumber} onChange={(e) => setCKYCNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                            </div>
                            :

                            <p>CKYC NO: <span>{CKYCNumber}</span></p>
                    }

                </div>
                {
                    editMode ?

                        <div className=' flex items-center'>
                            <span className=' font-semibold'>Todays Date :</span>
                            <input type="text" placeholder='Todays Date' value={todayDate} onChange={(e) => setTodayDate(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        </div>
                        :
                        <p>DATE: {todayDate}</p>
                }

            </div>
            <div className=' flex justify-center  print:text-[11px]'>
                {
                    editMode ?

                        <div className=' flex items-center'>
                            <span className=' font-semibold'>A/C Number :</span>
                            <input type="text" placeholder='A/C Number' value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        </div>
                        :

                        <p className=' mr-5'>A/C NO: <span>{accountNumber}</span></p>
                }
                {
                    editMode ?

                        <div className=' flex items-center'>
                            <span className=' font-semibold'>Currancy :</span>
                            <input type="text" placeholder='Currancy' value={accountCurrency} onChange={(e) => setAccountCurrency(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        </div>
                        :

                        <p className=' mr-10'>{accountCurrency}</p>
                }
                {/* <p>PAGE : 1</p> */}
            </div>

            <div className=' flex print:text-[12px] my-3'>
                {
                    editMode ?

                        <div className=' flex items-center'>
                            <span className=' font-semibold'>Account Holder Name :</span>
                            <input type="text" placeholder='Account Holder Name' value={accountHoldersName} onChange={(e) => setAccountHoldersName(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        </div>
                        :
                        <p className=' w-[40%]'>{accountHoldersName}</p>
                }
                <p>: Primary Holder</p>
            </div>
            <div className=' flex print:text-[11px]'>
                <div className=' w-[40%]'>
                    <div>
                        <p>CUSTOMER ADDRESS:</p>
                        {
                            editMode ?
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>Village :</span>
                                    <input type="text" placeholder='Village' value={accountHolderVilage} onChange={(e) => setAccountHolderVilage(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <p>{accountHolderVilage}</p>
                        }
                        {
                            editMode ?
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>State :</span>
                                    <input type="text" placeholder='State' value={accountHolderState} onChange={(e) => setAccountHolderState(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <p>{accountHolderState}</p>
                        }
                        {
                            editMode ?
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>Thana :</span>
                                    <input type="text" placeholder='Thana' value={accountHolderThana} onChange={(e) => setAccountHolderThana(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <p>{accountHolderThana}</p>
                        }
                        {
                            editMode ?
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>City :</span>
                                    <input type="text" placeholder='City' value={accountHolderCity} onChange={(e) => setAccountHolderCity(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <p>{accountHolderCity}</p>
                        }
                        {
                            editMode ?
                                <div className=' flex items-center'>
                                    <span className=' font-semibold'>Cuntry :</span>
                                    <input type="text" placeholder='Cuntry' value={accountHolderCuntry} onChange={(e) => setAccountHolderCuntry(e.target.value)} className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                </div>
                                :
                                <p>{accountHolderCuntry}</p>
                        }
                    </div>
                </div>
                <div>
                    <div className=' ml-10'>
                        <p>ACCOUNT ADDRESS:</p>
                        <p>{accountHolderVilage}</p>
                        <p>{accountHolderState}</p>
                        <p>{accountHolderThana}</p>
                        <p>{accountHolderCity}</p>
                        <p>{accountHolderCuntry}</p>
                    </div>
                </div>
            </div>
            <div className=' mt-5 flex justify-between  print:text-[11px]'>
                <div className=' flex'>
                    <p className=' mb-2'>STATEMENT OF ACCOUNT FOR THE PERIOD OF </p>
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
                            <p className=' ml-20'>{startStatementDate} to {endStatementDate} - Curr FFD Balance:</p>
                    }
                </div>
                {
                    editMode ?
                        <div>
                            <span>Current FFD Ballance : </span>
                            <input type="text" placeholder='Current FFD Balance' value={currentFFDBalance} onChange={(e) => setCurrentFFDBalance(e.target.value)} className=' rounded px-1 py-[1px] my-[2px] border border-blue-500 focus:outline-none' />
                        </div>
                        :
                        <p>{currentFFDBalance}</p>
                }
            </div>
            <div className=' flex justify-end'>
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
                        <div className=' flex my-[2px]'>
                            <span className=' inline-block w-32 text-right font-semibold print:font-semibold'>Currancy Suffix</span>
                            <span className=' mx-2 font-semibold print:font-semibold'>:</span>
                            <input type="text" value={currancySuffix} onChange={(e) => setCurrancySuffix(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                        </div>
                    </div>
                }
            </div>
            <div className=" w-full ">
                <table className=' w-full'>
                    <tbody>
                        <tr className="">
                            <th className="font-normal border-y pt-3 border-dashed  border-gray-400 print:text-[10px] pb-1 text-left">DATE</th>
                            <th className="font-normal border-y pt-3 border-dashed  border-gray-400 print:text-[10px] pb-1 text-left w-[30%]">PARTICULARS</th>
                            <th className="font-normal border-y pt-3 border-dashed  border-gray-400 print:text-[10px] pb-1 text-right">CHQ.NO</th>
                            <th className="font-normal border-y pt-3 border-dashed  border-gray-400 print:text-[10px] pb-1 text-right">WITHDRAWAL</th>
                            <th className="font-normal border-y pt-3 border-dashed  border-gray-400 print:text-[10px] pb-1  text-right">DEPOSITS</th>
                            <th className="font-normal border-y pt-3 border-dashed  border-gray-400 print:text-[10px] pb-1 text-right">BALANCE</th>
                        </tr>

                        {/* spacing row */}
                        <tr colSpan="6">
                            <div className=' w-full py-3'>

                            </div>
                        </tr>

                        {
                            randomTransictions.length > 0 && randomTransictions.map((item, index) => {
                                return (
                                    <tr className="align-text-top" key={index}>
                                        <td className=" text-sm print:text-[10px] print:leading-[11px]">
                                            {
                                                editMode ?
                                                    <input type="text" value={item.date} onChange={(e) => changeFields(e.target.value, index, "date", randomTransictions, setRandomTransictions)} placeholder='Date' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                    :
                                                    <span>{GetFormateDate(item.date)}</span>
                                            }
                                        </td>
                                        <td className="text-sm print:text-[10px] print:leading-[11px] w-[30%] pr-2">
                                            {
                                                editMode ?
                                                    <input type="text" value={item.particular} onChange={(e) => changeFields(e.target.value, index, "particular", randomTransictions, setRandomTransictions)} placeholder='Particulars' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                                    :
                                                    <span>{item.particular}</span>
                                            }
                                        </td>
                                        <td className="text-sm print:text-[10px] print:leading-[11px] text-right">
                                            {
                                                editMode ?
                                                    <input type="text" value={item.cheque} onChange={(e) => changeFields(e.target.value, index, "cheque", randomTransictions, setRandomTransictions)} placeholder='Cheque' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                                    :
                                                    <span>{item.cheque}</span>
                                            }
                                        </td>
                                        <td className="text-sm print:text-[10px] print:leading-[11px]  text-right">
                                            <p>{item.withdrawal > 0 && commaNumber(item.withdrawal)}</p>
                                        </td>
                                        <td className="text-sm print:text-[10px] print:leading-[11px] text-right">
                                            <p>{item.deposit > 0 && commaNumber(item.deposit)}</p>
                                        </td>
                                        <td className="text-sm print:text-[10px] print:leading-[11px] text-right">
                                            <p>{commaNumber(item.balance)}{currancySuffix}</p>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                        <tr>
                            <td className=" text-centert print:text-[10px] border-y border-dashed border-gray-400" colSpan={3}>Total</td>
                            <td className=" text-right text-sm print:text-[10px] border-y border-dashed border-gray-400" colSpan={3}>
                                <div className='flex justify-start'>
                                    <span className=' mr-5' >{commaNumber(totalWithdrawal)}</span>
                                    <span className=' mr-8'>{commaNumber(totalDeposit)}</span>
                                    <span>{randomTransictions.length > 0 && commaNumber(randomTransictions[randomTransictions.length - 1].balance)}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className=" text-centert print:text-[10px] print:leading-[14px]" colSpan={6}>
                                <div className=' print:text-[11px] mt-3'>
                                    <div className=' flex '>
                                        <span className=' mr-10'>T - Transfer</span>
                                        <span className=' mr-10'>C - Cash</span>
                                        <span>L - Clearing</span>
                                    </div>
                                    <p>Cheque Issued Charg - Charge for Cheque Book Issuance, ACCOUNT MAINTENENCE CHG - Charge for Inoperative Account,Chq. Retn Chargs- Charge for Dishonoured cheque,To Clg. Collection Chgrs - Charge for collection of outstation cheque, Ledger Folio Charge-Charges for Ledger Folio Maintenance,Min. BAL Chrg-Charge for Minimum Balance, To ISL-Charge for InterSol Transaction,Commitment Charges-Charges-Charge for account balance maintaing below saction limit.</p>
                                </div>
                                <div className=' flex mt-5 print:text-[11px]'>
                                    <div className=' w-[25%]'>
                                        <p>Unless the constituent notifies the bank immeditely of any discrepancy found vy him in ths statement of Account, it will be taken theat he has found the account corrent.</p>
                                    </div>
                                    <div className='ml-20 self-end flex relative'>
                                        <p className=' mr-16'>Date Stamp</p>
                                        <p>Manager</p>
                                        <img src={sil} alt="" className=' w-36 absolute -top-14 left-12' />
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UCOBankTransaction