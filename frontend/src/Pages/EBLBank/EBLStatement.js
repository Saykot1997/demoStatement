import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Host } from "../../Data"
import { transactionsFatchSuccess } from '../../Redux/Transactions_slice';
import commaNumber from 'comma-number'
import GenerateRandomTranjections from '../../Utils/GenerateRandomTransaction';
import logo from "../../Photos/ebl_bank/logo.png"
import sile from "../../Photos/ebl_bank/mid_logo.png"
import GetFormatedDate from "../../Utils/GetFormatedDate"
import changeFields from '../../Utils/ChangeFields';
import EditButtonComponent from '../../Components/EditButtonComponent';

function EBLStatement() {

    const [randomTransictions, setRandomTransictions] = useState([])
    const [initialBranchCode, setInitialBranchCode] = useState(32)
    const [transactionQuantity, setTransactionQuantity] = useState(40);
    const [initialBalance, setInitialBalance] = useState(700000);
    const [editMode, setEditMode] = useState(false);
    const [todayDate, setTodayDate] = useState("14-DEC-21");
    const [creditCount, setCreditCount] = useState(0)
    const [debitCount, setDebitCount] = useState(0)
    const [branchName, setBranchName] = useState("Chouhatta");
    const [branchAddress, setBranchAddress] = useState("Plot-1 Tea Board Building");
    const [branchRoad, setBranchRoad] = useState("Zindabaza");
    const [branchPoint, setBranchPoint] = useState("Chouhatta Point");
    const [branchCity, setBranchCity] = useState("Sylet")
    const [customerId, setCustomerId] = useState("871641872328")
    const [accountType, setAccountType] = useState("EBL Platinum Plus Savings");
    const [accountNumber, setAccountNumber] = useState("0009-03100007098");
    const [accountHoldersName, setAccountHoldersName] = useState("IKPAM RASHID");
    const [accountHoldersAddress, setAccountHoldersAddress] = useState("MOHONOB 5/1 C JOYNOB RESIDENCY");
    const [accountHolderState, setAccountHolderState] = useState("PATHAN TULA")
    const [accountHolderCity, setAccountHolderCity] = useState("SYLET")
    const [accountCurrency, setAccountCurrency] = useState("Bangladeshi Taka");
    const [startStatementDate, setStartStatementDate] = useState("01-OCT-21");
    const [endStatementDate, setEndStatementDate] = useState("13-MAR-22");
    const [hideStartStatementDate, setHideStartStatementDate] = useState("2021-10-01");
    const [hideEndStatementDate, setHideEndStatementDate] = useState("2022-03-31");
    const [totalWithdrawal, setTotalWithdrawal] = useState(0);
    const [totalDeposit, setTotalDeposit] = useState(0);
    const Transactions = useSelector(state => state.Transactions.Transactions);
    const User = useSelector(state => state.User.User);
    const dispatch = useDispatch();

    const getBankTransactions = async (value) => {

        try {

            const res = await axios.get(`${Host}/api/user/transaction/ebl_bank`, {
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

            let month = ""

            if (startStatementDateMonth.toString() === "01") {
                month = "JAN"
            } else if (startStatementDateMonth.toString() === "02") {
                month = "FEB"
            } else if (startStatementDateMonth.toString() === "03") {
                month = "MAR"
            } else if (startStatementDateMonth.toString() === "04") {
                month = "APR"
            } else if (startStatementDateMonth.toString() === "05") {
                month = "MAY"
            } else if (startStatementDateMonth.toString() === "06") {
                month = "JUN"
            } else if (startStatementDateMonth.toString() === "07") {
                month = "JUL"
            } else if (startStatementDateMonth.toString() === "08") {
                month = "AUG"
            } else if (startStatementDateMonth.toString() === "09") {
                month = "SEP"
            } else if (startStatementDateMonth.toString() === "10") {
                month = "OCT"
            } else if (startStatementDateMonth.toString() === "11") {
                month = "NOV"
            } else if (startStatementDateMonth.toString() === "12") {
                month = "DEC"
            } else {
                month = ""
            }

            let sprateYear = [...startStatementDateYear]

            setStartStatementDate(`${startStatementDateDay}-${month}-${`${sprateYear[2]}${sprateYear[3]}`}`);

            setHideStartStatementDate(`${startStatementDateYear}-${startStatementDateMonth}-${startStatementDateDay}`);

        } else if (option === "endStatementDate") {

            let endStatementDate = value.split("-");
            let endStatementDateYear = endStatementDate[0];
            let endStatementDateMonth = endStatementDate[1];
            let endStatementDateDay = endStatementDate[2];

            let month = ""

            if (endStatementDateMonth.toString() === "01") {
                month = "JAN"
            } else if (endStatementDateMonth.toString() === "02") {
                month = "FEB"
            } else if (endStatementDateMonth.toString() === "03") {
                month = "MAR"
            } else if (endStatementDateMonth.toString() === "04") {
                month = "APR"
            } else if (endStatementDateMonth.toString() === "05") {
                month = "MAY"
            } else if (endStatementDateMonth.toString() === "06") {
                month = "JUN"
            } else if (endStatementDateMonth.toString() === "07") {
                month = "JUL"
            } else if (endStatementDateMonth.toString() === "08") {
                month = "AUG"
            } else if (endStatementDateMonth.toString() === "09") {
                month = "SEP"
            } else if (endStatementDateMonth.toString() === "10") {
                month = "OCT"
            } else if (endStatementDateMonth.toString() === "12") {
                month = "NOV"
            } else if (endStatementDateMonth.toString() === "12") {
                month = "DEC"
            } else {
                month = ""
            }

            let sprateYear = [...endStatementDateYear]

            setEndStatementDate(`${endStatementDateDay}-${month}-${`${sprateYear[2]}${sprateYear[3]}`}`);
            setHideEndStatementDate(`${endStatementDateYear}-${endStatementDateMonth}-${endStatementDateDay}`);
        }
    }

    const GenerateTranjections = () => {

        if (!Transactions.length > 0) {
            return alert("No Transactions Found. Please select Bank Transaction First.")
        }

        const allData = GenerateRandomTranjections(hideStartStatementDate, hideEndStatementDate, Transactions, transactionQuantity, initialBalance);
        setTotalWithdrawal(allData.TotalWithdrawal);
        setTotalDeposit(allData.TotalDeposit);
        setRandomTransictions(allData.RandomTransictions);

        let inerdebitCount = 0
        let inercreditCount = 0

        allData.RandomTransictions.forEach((item, index) => {

            if (item.withdrawal > 0) {
                inerdebitCount = inerdebitCount + 1
            } else {
                inercreditCount = inercreditCount + 1
            }
        })

        setDebitCount(inerdebitCount)
        setCreditCount(inercreditCount)
        toggleEditMode();
    }


    useEffect(() => {
        getBankTransactions()
    }, [])

    // typeWriter

    return (
        <div className=" font-lora p-5 print:p-0 print:text-[8px] print:leading-3">

            <EditButtonComponent editMode={editMode} toggleEditMode={toggleEditMode} GenerateTranjections={GenerateTranjections} />

            <table className=' w-full'>
                <thead className=' table-header-group'>
                    <tr className=' w-full '>
                        <th className=" w-full report-header-cell font-normal" colspan="6">
                            <div className=' w-full flex justify-between'>
                                <div className='self-end flex flex-col items-start'>
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Name</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountHoldersName} onChange={(e) => setAccountHoldersName(e.target.value)} placeholder='Name' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{accountHoldersName}</p>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Address</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountHoldersAddress} onChange={(e) => setAccountHoldersAddress(e.target.value)} placeholder='address' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{accountHoldersAddress}</p>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>State</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountHolderState} onChange={(e) => setAccountHolderState(e.target.value)} placeholder='state' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{accountHolderState}</p>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>State</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountHolderCity} onChange={(e) => setAccountHolderCity(e.target.value)} placeholder='state' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{accountHolderCity}</p>
                                    }
                                </div>
                                <div>
                                    <img src={logo} alt="" className=' w-28' />
                                </div>
                            </div>
                            <div className=' flex justify-between pb-1 text-left'>
                                <div className='self-end'>
                                    <p>EASTERN BANK LIMITED</p>
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Branch</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={branchName} onChange={(e) => setBranchName(e.target.value)} placeholder='state' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{branchName} Branch</p>
                                    }

                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Branch Address</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={branchAddress} onChange={(e) => setBranchAddress(e.target.value)} placeholder='Address' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{branchAddress}</p>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Branch Road</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={branchRoad} onChange={(e) => setBranchRoad(e.target.value)} placeholder='Road' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :

                                            <p>{branchRoad} Road</p>
                                    }
                                    {
                                        editMode ?
                                            <div>
                                                <div className=' flex items-center my-[2px]'>
                                                    <span className=' inline-block w-32 text-right font-medium print:font-medium'>Branch Point</span>
                                                    <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                    <input type="text" value={branchPoint} onChange={(e) => setBranchPoint(e.target.value)} placeholder='Point' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                </div>
                                                <div className=' flex items-center my-[2px]'>
                                                    <span className=' inline-block w-32 text-right font-medium print:font-medium'>Branch City</span>
                                                    <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                    <input type="text" value={branchCity} onChange={(e) => setBranchCity(e.target.value)} placeholder='Point' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                </div>
                                            </div>
                                            :

                                            <p>{branchPoint} Point, {branchCity}</p>
                                    }
                                </div>
                                <div className=' self-end'>
                                    <p className=''>ONLINE STATEMENT</p>
                                </div>
                                <div className='text-left'>
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Account Number</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder='Account Number' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :
                                            <div>
                                                <span className=' w-28 inline-block'>Account Number</span>
                                                <span className=' mx-1'>:</span>
                                                <span>{accountNumber}</span>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Product Name</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountType} onChange={(e) => setAccountType(e.target.value)} placeholder='Account Type' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :
                                            <div>
                                                <span className=' w-28 inline-block'>Product Name</span>
                                                <span className=' mx-1'>:</span>
                                                <span>{accountType}</span>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=" leading-7 print:leading-[22px] flex">
                                                <span className='inline-block w-32 text-right font-medium print:font-medium'>Statement Date</span>

                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="date" placeholder='Start stetment date' value={hideStartStatementDate} onChange={(e) => statementDateChange("startStatementDate", e.target.value)} className=' rounded px-1 py-[1px] my-[2px] border border-blue-500 focus:outline-none' />

                                                to

                                                <input type="date" placeholder='Start stetment date' value={hideEndStatementDate} onChange={(e) => statementDateChange("endStatementDate", e.target.value)} className=' rounded px-1 py-[1px] my-[2px] border border-blue-500 focus:outline-none' />
                                            </div>
                                            :
                                            <div>
                                                <span className=' w-28 inline-block'>Period From</span>
                                                <span className=' mx-1'>:</span>
                                                <span>{startStatementDate} - {endStatementDate}</span>
                                            </div>
                                    }


                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Currancy Name</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={accountCurrency} onChange={(e) => setAccountCurrency(e.target.value)} placeholder='Account Type' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :
                                            <div>
                                                <span className=' w-28 inline-block'>Currancy Name</span>
                                                <span className=' mx-1'>:</span>
                                                <span>{accountCurrency}</span>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Branch Code</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={initialBranchCode} onChange={(e) => setInitialBranchCode(e.target.value)} placeholder='Account Type' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :
                                            <div>
                                                <span className=' w-28 inline-block'>Branch Code</span>
                                                <span className=' mx-1'>:</span>
                                                <span>{initialBranchCode}</span>
                                            </div>
                                    }
                                    {
                                        editMode ?
                                            <div className=' flex items-center my-[2px]'>
                                                <span className=' inline-block w-32 text-right font-medium print:font-medium'>Customer Id</span>
                                                <span className=' mx-2 font-medium print:font-medium'>:</span>
                                                <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} placeholder='Customer Id' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                            </div>
                                            :
                                            <div>
                                                <span className=' w-28 inline-block'>Customer Id</span>
                                                <span className=' mx-1'>:</span>
                                                <span>{customerId}</span>
                                            </div>
                                    }

                                </div>
                            </div>

                            {
                                editMode &&
                                <div className=' flex flex-col items-end pr-28'>
                                    <div className=' flex items-center my-1'>
                                        <span className=' mr-2'>Initial Blance</span>
                                        <input type="text" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                    </div>
                                    <div className=' flex items-center my-1'>
                                        <span className=' mr-2'>Initial Branch Code</span>
                                        <input type="text" value={initialBranchCode} onChange={(e) => setInitialBranchCode(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                    </div>
                                    <div className=' flex items-center'>
                                        <span className=' mr-2'>Number of row</span>
                                        <input type="text" value={transactionQuantity} onChange={(e) => setTransactionQuantity(e.target.value)} placeholder='Blance' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                    </div>

                                </div>
                            }
                        </th>
                    </tr>
                </thead>

                <thead className=''>
                    <tr className=''>
                        <td className=' pt-1 w-[10%]'>TRN. DATE</td>
                        <td className=' pt-1 w-[25%] text-left'>DESCRIPTIONS</td>
                        <td className=' pt-1 w-[10%] text-left pl-3'>REFERENCES</td>
                        <td className=' pt-1 text-right'>DEBITS</td>
                        <td className=' pt-1 text-right'>CREDITS</td>
                        <td className=' pt-1 text-right'>BALANCE</td>
                    </tr>
                </thead>

                <tbody className=''>
                    <tr>
                        <td className='text-left py-[4px]'>{
                            editMode ?
                                <input type="text" value={todayDate} onChange={(e) => setTodayDate(e.target.value)} placeholder='Todays Date' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                :
                                <span>{todayDate}</span>
                        }</td>
                        <td className='py-[4px]'>Opening Balance</td>
                        <td className='pl-3'></td>
                        <td></td>
                        <td className='text-right py-[4px]'>{commaNumber(initialBalance)}</td>
                        <td className='text-right py-[4px]'>{commaNumber(initialBalance)}</td>
                    </tr>
                    {
                        randomTransictions.length > 0 && randomTransictions.map((item, index) => {
                            return (
                                <tr className='align-text-top'>
                                    <td className='text-left py-[4px]'>
                                        {
                                            editMode ?
                                                <input type="text" value={item.date} onChange={(e) => changeFields(e.target.value, index, "date", randomTransictions, setRandomTransictions)} placeholder='Date' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                :
                                                <span> {item.date && GetFormatedDate(item.date)}</span>
                                        }

                                    </td>
                                    <td className='text-left py-[4px]'>
                                        {
                                            editMode ?
                                                <input type="text" value={item.particular} onChange={(e) => changeFields(e.target.value, index, "particular", randomTransictions, setRandomTransictions)} placeholder='Particulars' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none w-full' />
                                                :
                                                <span>{item.particular}</span>
                                        }
                                    </td>
                                    <td className='text-left pl-3 py-[4px]'>
                                        {
                                            editMode ?
                                                <input type="text" value={item.ref} onChange={(e) => changeFields(e.target.value, index, "ref", randomTransictions, setRandomTransictions)} placeholder='References' className=' rounded p-1 my-[2px] border border-blue-500 focus:outline-none block' />
                                                :
                                                <span>{item.ref}</span>
                                        }
                                    </td>
                                    <td className='text-right py-[4px]'>{item.withdrawal > 0 && commaNumber(item.withdrawal)}</td>
                                    <td className='text-right py-[4px]'>{item.deposit > 0 && commaNumber(item.deposit)}</td>
                                    <td className='text-right py-[4px]'>{commaNumber(item.balance)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr className='w-full'>
                        <td colSpan={6}>
                            <div className=' w-full pt-5'>
                                <div className=' w-full border-t border-dashed border-gray-600'>
                                    <div className=' pl-28 pt-3'>
                                        <div>
                                            <span className=' w-60 print:w-40 inline-block'>OPENING BALANCE</span>
                                            <span className=' w-44 print:w-20 inline-block'>{commaNumber(initialBalance)}</span>
                                            <span></span>
                                        </div>
                                        <div>
                                            <span className=' w-60 print:w-40 inline-block'>DEBITS</span>
                                            <span className=' w-44 print:w-20 inline-block'>{commaNumber(totalWithdrawal)}</span>
                                            <span className=''>DRCOUNT {debitCount}</span>
                                        </div>
                                        <div>
                                            <span className=' w-60 print:w-40 inline-block'>CREDITS</span>
                                            <span className=' w-44 print:w-20 inline-block'>{commaNumber(totalDeposit)}</span>
                                            <span className=''>CRCOUNT {creditCount}</span>
                                        </div>
                                        <div className=' '>
                                            <span className=' w-60 print:w-40 inline-block'>UNCOLLECTED FUNDS</span>
                                            <span className=' w-44 print:w-[53px] inline-block'></span>
                                            <span className=''>SWITCH AMOUNT 0</span>
                                        </div>
                                        <div>
                                            <span className=' w-60 print:w-48 inline-block'>* = UNAUTH ENTRY / R = REVERSAL</span>
                                            <span className=' w-44 print:w-36 inline-block'></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
                <tfoot class="table-footer-group" id='pageFooter'>
                    <tr>
                        <td class=" " colspan="6">
                            <div className=' w-full'>
                                <div className=' flex justify-center'>
                                    <img src={sile} alt="" className={`w-32`} />
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default EBLStatement