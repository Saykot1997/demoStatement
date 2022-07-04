import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Transactions: [],
}

export const TransactionSlice = createSlice({
    name: 'Transactions',
    initialState,
    reducers: {
        transactionsFatchSuccess: (state, action) => {
            state.Transactions = action.payload;
        },
        transactionsAddSuccess: (state, action) => {
            state.Transactions.push(action.payload);
        },
        transactionUpdateSuccess: (state, action) => {

            let getInex = state.Transactions.findIndex(transaction => transaction._id === action.payload._id);
            state.Transactions[getInex] = action.payload;
        },
        transactionDeleteSuccess: (state, action) => {

            state.Transactions = state.Transactions.filter(transaction => { return transaction._id !== action.payload })
        }

    },
})

export const { transactionsFatchSuccess, transactionsAddSuccess, transactionUpdateSuccess, transactionDeleteSuccess } = TransactionSlice.actions

export default TransactionSlice.reducer