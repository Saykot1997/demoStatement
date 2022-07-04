import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    TransactionAmount: {
        ATM: [],
        Cheque: [],
    }
}

export const TransactionAmount = createSlice({
    name: 'TransactionAmount',
    initialState,
    reducers: {

        TransactionAmountFatchSuccess: (state, action) => {

            state.TransactionAmount = action.payload;
        },

    },
})

export const { TransactionAmountFatchSuccess } = TransactionAmount.actions

export default TransactionAmount.reducer