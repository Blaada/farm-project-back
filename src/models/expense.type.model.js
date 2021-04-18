const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const expenseTypeSchema = mongoose.Schema(
    {
        expenseType: {
            type: String,
            required: true
        },
        createDate: {
            type: Date,
            default:Date.now
        }
    }
);

expenseTypeSchema.plugin(toJSON);
expenseTypeSchema.plugin(paginate);
const ExpenseType = mongoose.model('ExpenseType', expenseTypeSchema);

module.exports = ExpenseType;