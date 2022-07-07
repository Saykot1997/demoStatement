import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { Host } from "../../Data"
import { useDispatch, useSelector } from 'react-redux';
import { transactionsFatchSuccess, transactionUpdateSuccess, transactionDeleteSuccess } from '../../Redux/Transactions_slice';
import AddTransactionEBL from '../../Components/AddTransactionEBL';
import { FaSave } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function IB() {

    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const User = useSelector(state => state.User.User);
    const Transaction = useSelector(state => state.Transactions.Transactions);
    const dispatch = useDispatch();
    const [addTransactionMode, setAddTransactionMode] = useState(false);
    const [updateModeOpen, setUpdateModeOpen] = useState(false);
    const [currentTransactionId, setCurrentTransactionId] = useState('');
    const [currentTransactionMethod, setCurrentTransactionMethod] = useState('');
    const [currentTransactionType, setCurrentTransactionType] = useState('');
    const [currentTransactionCheque, setCurrentTransactionCheque] = useState('');
    const [currentTransectionName, setCurrentTransectionName] = useState('');
    const [currentTransectionAmount, setCurrentTransectionAmount] = useState('');
    const [currentTransectionLimit, setCurrentTransectionLimit] = useState(0);
    const [currentTransectionDepent, setCurrentTransectionDepent] = useState(false);
    const [currentTransectionDepentData, setCurrentTransectionDepentData] = useState({});
    const transectionMethod = ['cash', 'cheque', 'online', "atm"];


    const toggleAddTransactionMode = () => {
        setAddTransactionMode(!addTransactionMode)
    }

    const toggleUpdateMode = (transaction) => {
        setUpdateModeOpen(!updateModeOpen)
        setCurrentTransectionName(transaction.transactionName)
        setCurrentTransactionId(transaction._id)
        setCurrentTransactionMethod(transaction.transactionMethod)
        setCurrentTransactionType(transaction.transactionType)
        setCurrentTransactionCheque(transaction.cheque)
        setCurrentTransectionAmount(transaction.amount)
        setCurrentTransectionLimit(transaction.limit)
        setCurrentTransectionDepent(transaction.dependent)
        setCurrentTransectionDepentData(transaction.dependantData)

    }

    const getTransaction = async () => {

        try {

            const response = await axios.get(`${Host}/api/user/transaction/${path}`, {
                headers: {
                    Authorization: `Bearer ${User}`
                }
            });

            dispatch(transactionsFatchSuccess(response.data));

        } catch (error) {

            console.log(error)
        }
    }

    const updateTransaction = async () => {

        const data = {
            transactionName: currentTransectionName,
            transactionType: currentTransactionType,
            transactionMethod: currentTransactionMethod,
            cheque: currentTransactionCheque,
            bankName: path,
            amount: currentTransectionAmount,
            limit: currentTransectionLimit,
        }

        if (currentTransectionDepent === "true") {
            data.dependent = true
            data.dependentData = currentTransectionDepentData
        } else {
            data.dependent = false
            data.dependentData = {}
        }

        try {

            const response = await axios.put(`${Host}/api/user/transaction/${currentTransactionId}`, data, {
                headers: {
                    Authorization: `Bearer ${User}`
                }
            })

            dispatch(transactionUpdateSuccess(response.data));
            toast.success('Transaction updated successfully')
            setUpdateModeOpen(false)

        } catch (error) {

            if (error.response.data === "Please fill all fields") {

                toast.error('Please fill all fields')

            } else {

                console.log(error)
                toast.error('Something went wrong')
            }
        }
    }


    const changeDependent = (value, transaction) => {

        setCurrentTransectionDepent(value)

        const data = {
            transactionName: "",
            transactionType: "",
            amount: "",
            ref: "",
        }

        setCurrentTransectionDepentData(data)
    }

    const confirmDelete = async (transactionId) => {

        window.confirm("Are you sure you want to delete this transaction?") && deleteTransaction(transactionId)
    }

    const deleteTransaction = async (transactionId) => {

        try {

            await axios.delete(`${Host}/api/user/transaction/${transactionId}`, {
                headers: {
                    Authorization: `Bearer ${User}`
                }
            })

            dispatch(transactionDeleteSuccess(transactionId));
            toast.success('Transaction deleted successfully')

        } catch (error) {

            console.log(error)
            toast.error('Something went wrong')
        }
    }

    const dependantDataChange = (value, field) => {

        let newObject = {
            ...currentTransectionDepentData
        }
        newObject[field] = value
        setCurrentTransectionDepentData(newObject)
    }



    useEffect(() => {
        getTransaction()
    }, [path])


    return (
        <div className='w-full h-[calc(100vh-64px)] bg-gray-100 overflow-y-scroll p-5'>
            <button onClick={toggleAddTransactionMode} className=' absolute top-20 right-5 shadow shadow-blue-300 p-1 rounded text-blue-600 hover:scale-105 transition-all ease-in'>Add Transactions</button>
            {
                Transaction.length > 0 ?
                    <p className='text-center font-medium'>{Transaction[0].bankName} Transaction Details {Transaction.length}</p>
                    :
                    <div>
                        <p className=' text-center font-medium'>No Transactions Added</p>
                    </div>
            }
            <div className=' w-full grid grid-cols-3 gap-5 mt-5' >
                {
                    Transaction.length > 0 && Transaction.map(transaction => {
                        return (
                            <div className=' bg-white px-5 py-3 rounded shadow flex justify-between' key={transaction._id}>
                                {
                                    updateModeOpen && currentTransactionId === transaction._id ?
                                        <div>
                                            <div>
                                                <label htmlFor="">Particulars</label>
                                                <input type="text" placeholder='Particulars' value={currentTransectionName} onChange={(e) => setCurrentTransectionName(e.target.value)} className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                            </div>

                                            <div>
                                                <label htmlFor="">Transaction Type</label>
                                                <select value={currentTransactionType} onChange={(e) => setCurrentTransactionType(e.target.value)} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none mt-4 mb-2'>
                                                    <option value="">Select Transection Type</option>
                                                    <option value="credit">Credit</option>
                                                    <option value="debit">Debit</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="">Transaction Mathod</label>
                                                <select name="" id="" value={currentTransactionMethod} onChange={(e) => setCurrentTransactionMethod(e.target.value)} className=' border border-blue-500 p-1 rounded focus:outline-none mt-4 mb-2'>
                                                    <option value="">Select Transaction Method</option>
                                                    {
                                                        transectionMethod.map(method => {
                                                            return <option value={method}>{method}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor="">Cheque</label>
                                                <input type="text" placeholder='Cheque' value={currentTransactionCheque} onChange={(e) => setCurrentTransactionCheque(e.target.value)} className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                            </div>
                                            <div>
                                                <label htmlFor="">Amount</label>
                                                <input type="text" placeholder='Amount' value={currentTransectionAmount} onChange={(e) => setCurrentTransectionAmount(e.target.value)} className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                            </div>
                                            <div>
                                                <label htmlFor="">Limit</label>
                                                <input type="text" placeholder='Limit' value={currentTransectionLimit} onChange={(e) => setCurrentTransectionLimit(e.target.value)} className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                            </div>
                                            <div >
                                                <label htmlFor="" className=' block'>Dependent</label>
                                                <select value={currentTransectionDepent} onChange={(e) => changeDependent(e.target.value, transaction)} placeholder='Dependent' name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none'>
                                                    <option value="">Selet Dependent Type</option>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                                </select>
                                            </div>
                                            {
                                                currentTransectionDepent === "true" &&
                                                <div>
                                                    <p>Depent Data</p>
                                                    <div>
                                                        <div className=' my-5'>
                                                            <label htmlFor="">Particulars</label>
                                                            <input type="text" value={currentTransectionDepentData.transactionName} onChange={(e) => dependantDataChange(e.target.value, "transactionName")} placeholder='Particulars' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                                        </div>
                                                        <div className=' mb-5'>
                                                            <label htmlFor="">Cheque</label>
                                                            <input type="text" value={currentTransectionDepentData.cheque} onChange={(e) => dependantDataChange(e.target.value, "cheque")} placeholder='Cheque' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                                        </div>
                                                        <div className=' mb-5'>
                                                            <label htmlFor="">Transaction Amount</label>
                                                            <input type="text" value={currentTransectionDepentData.amount} onChange={(e) => dependantDataChange(e.target.value, "amount")} placeholder='Amount' className=' border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                                        </div>

                                                        <div className=' mb-5'>
                                                            <label htmlFor="">Transaction Type</label>
                                                            <select value={currentTransectionDepentData.transactionType} onChange={(e) => dependantDataChange(e.target.value, "transactionType")} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none'>
                                                                <option value="">Select Transection Type</option>
                                                                <option value="credit">Credit</option>
                                                                <option value="debit">Debit</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div>
                                            <p className=' mb-2 text-sm'> <span className=' font-medium'>Particulars : </span>{transaction.transactionName}</p>
                                            <p className=' my-2 text-sm'> <span className=' font-medium'>Transaction Method :</span> {transaction.transactionMethod}</p>
                                            <p className=' my-2 text-sm'> <span className=' font-medium'>Transaction Type :</span> {transaction.transactionType}</p>
                                            <p className=' mt-2 text-sm'> <span className=' font-medium'>Cheque :</span> {transaction.cheque}</p>
                                            <p className=' mt-2 text-sm'> <span className=' font-medium'>Transaction Amount :</span> {transaction.amount}</p>
                                            <p className=' mt-2 text-sm'> <span className=' font-medium'>Limit :</span> {transaction.limit}</p>
                                            <p className=' mt-2 text-sm'> <span className=' font-medium'>Dependent :</span> {transaction.dependent ? "True" : "False"}</p>
                                            {
                                                transaction.dependent &&
                                                <div className=' mt-1'>

                                                    <p>Dependent Data :</p>
                                                    <p className=' mt-2 text-sm'> <span className=' font-medium'>Particulars :</span> {transaction.dependentData.transactionName}</p>
                                                    <p className=' mt-2 text-sm'> <span className=' font-medium'>Amount :</span> {transaction.dependentData.amount}</p>
                                                    <p className=' mt-2 text-sm'> <span className=' font-medium'>Cheque :</span> {transaction.dependentData.cheque}</p>
                                                    <p className=' mt-2 text-sm'> <span className=' font-medium'>Type :</span> {transaction.dependentData.transactionType}</p>

                                                </div>
                                            }
                                        </div>
                                }
                                {
                                    updateModeOpen && currentTransactionId === transaction._id ?


                                        <div className=' flex'>
                                            <FaSave onClick={updateTransaction} className=' text-blue-500 cursor-pointer mr-2' />
                                            <AiFillCloseSquare onClick={() => { toggleUpdateMode(transaction) }} className=' text-red-500 text-lg cursor-pointer' />
                                        </div>

                                        :

                                        <div className=' flex'>
                                            <BiEdit onClick={() => { toggleUpdateMode(transaction) }} className=' text-green-500 cursor-pointer mr-2' />
                                            <MdDelete onClick={() => { confirmDelete(transaction._id) }} className=' text-red-500 text-lg cursor-pointer' />
                                        </div>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {
                addTransactionMode &&
                <AddTransactionEBL toggleAddTransactionMode={toggleAddTransactionMode} />
            }


            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                className="w-72"
            />
        </div>
    )
}

export default IB