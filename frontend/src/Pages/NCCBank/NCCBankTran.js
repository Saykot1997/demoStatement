import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { Host } from "../../Data"
import { useDispatch, useSelector } from 'react-redux';
import { transactionsFatchSuccess, transactionUpdateSuccess, transactionDeleteSuccess } from '../../Redux/Transactions_slice';
import AddTransactionJ1 from '../../Components/AddTransactionJ1';
import { FaSave } from 'react-icons/fa';
import { AiFillCloseSquare } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function NCCBankTran() {

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
    const [currentTransactionBranch, setCurrentTransactionBranch] = useState('');
    const [currentTransectionName, setCurrentTransectionName] = useState('');
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
        setCurrentTransactionBranch(transaction.branch)
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

    const updateTransaction = async (transaction) => {

        const data = {

            transactionName: currentTransectionName,
            transactionType: currentTransactionType,
            transactionMethod: currentTransactionMethod,
            branch: currentTransactionBranch,
            bankName: path
        }

        try {

            const response = await axios.put(`${Host}/api/user/transaction/${currentTransactionId}`, data, {
                headers: {
                    Authorization: `Bearer ${User}`
                }
            })
            console.log(response.data)
            dispatch(transactionUpdateSuccess(response.data));
            toast.success('Transaction updated successfully')
            setUpdateModeOpen(false)

        } catch (error) {

            if (error.response.data === "Transaction name already exists") {

                toast.error('Transaction name already exists')

            } else if (error.response.data === "Please fill all fields") {

                toast.error('Please fill all fields')

            } else {

                console.log(error)
                toast.error('Something went wrong')
            }
        }
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

    useEffect(() => {

        getTransaction()

    }, [path])


    return (
        <div className='w-full h-[calc(100vh-64px)] bg-gray-100 overflow-y-scroll p-5'>
            <button onClick={toggleAddTransactionMode} className=' absolute top-20 right-5 shadow shadow-blue-300 p-1 rounded text-blue-600 hover:scale-105 transition-all ease-in'>Add Transactions</button>
            {
                Transaction.length > 0 ?
                    <p className='text-center font-medium'>{Transaction[0].bankName} Transaction Details</p>
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
                                            <input type="text" placeholder='Transection Name' value={currentTransectionName} onChange={(e) => setCurrentTransectionName(e.target.value)} className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                            <select name="" id="" value={currentTransactionMethod} onChange={(e) => setCurrentTransactionMethod(e.target.value)} className=' border border-blue-500 p-1 rounded focus:outline-none mt-4 mb-2'>
                                                <option value="">Select Transaction Method</option>
                                                {
                                                    transectionMethod.map(method => {
                                                        return <option value={method}>{method}</option>
                                                    })
                                                }
                                            </select>
                                            <select value={currentTransactionType} onChange={(e) => setCurrentTransactionType(e.target.value)} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none mt-4 mb-2'>
                                                <option value="">Select Transection Type</option>
                                                <option value="credit">Credit</option>
                                                <option value="debit">Debit</option>
                                            </select>
                                            <input type="text" placeholder='Branch Code' value={currentTransactionBranch} onChange={(e) => setCurrentTransactionBranch(e.target.value)} className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                                        </div>
                                        :
                                        <div>
                                            <p className=' mb-2 text-sm'> <span className=' font-medium'>Transaction Name : </span>{transaction.transactionName}</p>
                                            <p className=' my-2 text-sm'> <span className=' font-medium'>Transaction Method :</span> {transaction.transactionMethod}</p>
                                            <p className=' my-2 text-sm'> <span className=' font-medium'>Transaction Type :</span> {transaction.transactionType}</p>
                                            <p className=' mt-2 text-sm'> <span className=' font-medium'>Branch :</span> {transaction.branch}</p>
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
                <AddTransactionJ1 toggleAddTransactionMode={toggleAddTransactionMode} />
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

export default NCCBankTran