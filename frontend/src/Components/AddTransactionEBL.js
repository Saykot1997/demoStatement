import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { transactionsAddSuccess } from "../Redux/Transactions_slice";

function EBL({ toggleAddTransactionMode }) {

    const User = useSelector(state => state.User.User);
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const [transactionName, setTransactionName] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('');
    const [transactionAmount, setTransactionAmount] = useState('')
    const [ref, setRef] = useState('');
    const [bankName, setBankName] = useState('');
    const transectionMethod = ['cash', 'cheque', 'online', "atm"];
    const [limit, setLimit] = useState(0)
    const [dependent, setDependent] = useState(false)
    const [dependentData, setDependentData] = useState({})


    const clearFields = () => {
        setTransactionName('');
        setTransactionType('');
        setTransactionMethod('');
        setRef('');
        setTransactionAmount("")
        setLimit(0)
        setDependent(false)
        setDependentData({})
    }

    const CreateTransaction = async () => {

        if (transactionName === '' || transactionType === '' || transactionMethod === '' || bankName === '') {

            return toast.error('Please fill all the fields')
        }

        const data = {
            transactionName,
            transactionType,
            transactionMethod,
            ref,
            bankName,
            amount: transactionAmount,
            limit: parseInt(limit),
            dependentData
        };

        if (dependent === "true") {
            data.dependent = true
        } else {
            data.dependent = false
        }

        try {

            const response = await axios.post(`${Host}/api/user/transaction`, data, {
                headers: {
                    Authorization: `Bearer ${User}`
                }
            })

            dispatch(transactionsAddSuccess(response.data));
            toast.success('Transaction added successfully')
            clearFields();

        } catch (error) {

            if (error.response.data === "Transaction already exists") {
                toast.error('Transaction already exists')
            } else if (error.response.data === "Please fill all fields") {
                toast.error('Please fill all the fields')
            } else {
                console.log(error)
                toast.error('Something went wrong')
            }
        }
    }

    const dependantDataChange = (value, field) => {

        let newObject = {
            ...dependentData
        }
        newObject[field] = value
        setDependentData(newObject)
    }

    const changeDependent = (value) => {

        setDependent(value)
        setDependentData({
            transactionName: "",
            transactionType: "",
            amount: "",
            ref: "",
        })
    }


    useEffect(() => {
        setBankName(path)
    }, [path])




    return (
        <div className=' w-screen h-screen overflow-y-scroll absolute top-0 left-0 bg-black bg-opacity-25 p-5 z-20'>
            <div className=' px-10 flex justify-end'>
                <button onClick={toggleAddTransactionMode} className=' bg-red-500 py-[6px] px-2 rounded text-white'>Close</button>
            </div>
            <div className=' flex justify-center w-full'>
                <div className=' bg-white shadow rounded w-[350px] px-7 py-5 mt-10'>
                    <p className=' text-center font-medium'>Create Transactions</p>
                    <div className=' my-5'>
                        <label htmlFor="">Descriptions</label>
                        <input type="text" value={transactionName} onChange={(e) => setTransactionName(e.target.value)} placeholder='Descriptions' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                    </div>
                    <div className=' mb-5'>
                        <label htmlFor="">Ref</label>
                        <input type="text" value={ref} onChange={(e) => setRef(e.target.value)} placeholder='Reference' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                    </div>
                    <div className=' mb-5'>
                        <label htmlFor="">Transaction Amount</label>
                        <input type="text" value={transactionAmount} onChange={(e) => setTransactionAmount(e.target.value)} placeholder='Amount' className=' border border-blue-500 rounded p-1 focus:outline-none w-full' />
                    </div>
                    <div className=' mb-5'>
                        <label htmlFor="">Limit</label>
                        <input type="number" value={limit} onChange={(e) => setLimit(e.target.value)} placeholder='Limit' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                    </div>
                    <div className=' mb-5'>
                        <label htmlFor="">Transaction Type</label>
                        <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none'>
                            <option value="">Select Transection Type</option>
                            <option value="credit">Credit</option>
                            <option value="debit">Debit</option>
                        </select>
                    </div>
                    <div className=' mb-4'>
                        <label htmlFor="">Transaction Mathod</label>
                        <select value={transactionMethod} onChange={(e) => setTransactionMethod(e.target.value)} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none'>
                            <option value="">Select Transection Method</option>
                            {transectionMethod.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div>

                    <div >
                        <label htmlFor="" className=' block'>Dependent</label>
                        <select value={dependent} onChange={(e) => changeDependent(e.target.value)} placeholder='Dependent' name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none'>
                            <option value="">Selet Dependent Type</option>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>

                    {
                        dependent === "true" &&
                        <div>
                            <div className=' my-5'>
                                <label htmlFor="">Descriptions</label>
                                <input type="text" value={dependentData.transactionName} onChange={(e) => dependantDataChange(e.target.value, "transactionName")} placeholder='Descriptions' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                            </div>
                            <div className=' mb-5'>
                                <label htmlFor="">Ref</label>
                                <input type="text" value={dependentData.ref} onChange={(e) => dependantDataChange(e.target.value, "ref")} placeholder='Reference' className='border border-blue-500 rounded p-1 focus:outline-none w-full' />
                            </div>
                            <div className=' mb-5'>
                                <label htmlFor="">Transaction Amount</label>
                                <input type="text" value={dependentData.amount} onChange={(e) => dependantDataChange(e.target.value, "amount")} placeholder='Amount' className=' border border-blue-500 rounded p-1 focus:outline-none w-full' />
                            </div>

                            <div className=' mb-5'>
                                <label htmlFor="">Transaction Type</label>
                                <select value={dependentData.transactionType} onChange={(e) => dependantDataChange(e.target.value, "transactionType")} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none'>
                                    <option value="">Select Transection Type</option>
                                    <option value="credit">Credit</option>
                                    <option value="debit">Debit</option>
                                </select>
                            </div>
                        </div>
                    }
                    <div className='mt-5 flex justify-center'>
                        <button onClick={CreateTransaction} className='shadow shadow-blue-300 p-1 rounded text-blue-600 hover:scale-105 transition-all ease-in'>Save</button>
                    </div>
                </div>
            </div>
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

export default EBL