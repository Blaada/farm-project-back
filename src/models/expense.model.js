const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const expenseSchema = mongoose.Schema(
    {
        expenseLabel: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        expenseType: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        expenseRelatedToFarmers: {
            type: Boolean,
            default: false
        },
        expenseMesureUnit: {
            type: String
        },  
        createDate: {
            type: Date,
            default: Date.now
        }
    }
);

expenseSchema.plugin(toJSON);
expenseSchema.plugin(paginate);
const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;