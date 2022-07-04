import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Host } from '../Data';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { transactionsAddSuccess } from "../Redux/Transactions_slice";

function AB({ toggleAddTransactionMode }) {

    const User = useSelector(state => state.User.User);
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const [transactionName, setTransactionName] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [transactionMethod, setTransactionMethod] = useState('');
    const [branch, setBranch] = useState('');
    const [bankName, setBankName] = useState('');
    const transectionMethod = ['cash', 'cheque', 'online', "atm"];


    const clearFields = () => {
        setTransactionName('');
        setTransactionType('');
        setTransactionMethod('');
        setBranch('');
    }

    const CreateTransaction = async () => {

        if (transactionName === '' || transactionType === '' || transactionMethod === '' || branch === '' || bankName === '') {

            return toast.error('Please fill all the fields')
        }

        const data = {
            transactionName,
            transactionType,
            transactionMethod,
            branch,
            bankName,
        };

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


    useEffect(() => {
        setBankName(path)
    }, [path])




    return (
        <div className=' w-screen h-screen absolute top-0 left-0 bg-black bg-opacity-25 p-5 z-20'>
            <div className=' px-10 flex justify-end'>
                <button onClick={toggleAddTransactionMode} className=' bg-red-500 py-[6px] px-2 rounded text-white'>Close</button>
            </div>
            <div className=' flex justify-center w-full'>
                <div className=' bg-white shadow rounded w-[350px] px-7 py-5 mt-10'>
                    <p className=' text-center font-medium'>Create Transactions</p>
                    <input type="text" value={transactionName} onChange={(e) => setTransactionName(e.target.value)} placeholder='Remarks' className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                    <input type="text" value={branch} onChange={(e) => setBranch(e.target.value)} placeholder='Trans. Code / Chq No' className='mt-5 border border-blue-500 rounded p-1 focus:outline-none w-full' />
                    <select value={transactionType} onChange={(e) => setTransactionType(e.target.value)} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none mt-4 mb-2'>
                        <option value="">Select Transection Type</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>

                    <select value={transactionMethod} onChange={(e) => setTransactionMethod(e.target.value)} name="" id="" className=' border border-blue-500 p-1 rounded focus:outline-none my-2'>
                        <option value="">Select Transection Method</option>
                        {transectionMethod.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })}
                    </select>
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

export default AB