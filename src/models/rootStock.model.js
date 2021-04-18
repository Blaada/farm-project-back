const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rootStockSchema = mongoose.Schema(
    {
        rootStock: {
            type: String,
            required: true
        },
        createDate: {
            type: Date,
            default:Date.now
        }
    }
);
rootStockSchema.plugin(toJSON);
rootStockSchema.plugin(paginate);
const RootStock = mongoose.model('RootStock', rootStockSchema);

module.exports = RootStock;