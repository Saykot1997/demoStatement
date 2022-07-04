import { configureStore } from '@reduxjs/toolkit';
import BanksReducer from './Banks_slice';
import TransactionsReducer from './Transactions_slice';
import UserReducer from './User_slice';
import TransactionAmountReducer from './TransactionAmount_slice';

export const store = configureStore({
    reducer: {
        Banks: BanksReducer,
        Transactions: TransactionsReducer,
        User: UserReducer,
        TransactionAmount: TransactionAmountReducer,

    },
})