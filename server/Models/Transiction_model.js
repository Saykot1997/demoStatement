const mongoose = require('mongoose');

const BankTransictionSchema = new mongoose.Schema({

    transactionName: {
        type: String,
        required: true,
    },
    bankName: {
        type: String,
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    transactionMethod: {
        type: String,
        enum: ['cash', 'cheque', 'online', "atm",],
    },
    amount: {
        type: String,
        require: true
    },
    limit: {
        type: Number,
        default: 0
    },
    dependent: {
        type: Boolean,
        default: false
    },
    dependantData: {
        type: Object
    }

}, { strict: false }, { timestamps: true });

module.exports = mongoose.model('BankTransiction', BankTransictionSchema);