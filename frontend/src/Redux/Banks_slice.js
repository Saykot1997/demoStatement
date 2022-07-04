import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Banks: []
}

export const BanksSlice = createSlice({
    name: 'Banks',
    initialState,
    reducers: {
        fatchSuccess: (state, action) => {
            state.Banks = action.payload;
        },
        addBank: (state, action) => {
            state.Banks.push(action.payload);
        },
        updateBank: (state, action) => {
            state.Banks.map(bank => {
                if (bank._id === action.payload._id) {
                    bank.bankName = action.payload.bankName;
                } else {
                    return bank;
                }
            })
        },
        deleteBank: (state, action) => {
            state.Banks = state.Banks.filter(bank => bank._id !== action.payload);
        }
    },
})

export const { fatchSuccess, addBank, deleteBank, updateBank } = BanksSlice.actions

export default BanksSlice.reducer