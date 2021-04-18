const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const varietySchema = mongoose.Schema(
    {
        variety: {
            type: String,
            required: true
        },
        rootType: {
            type: String,
            reequired: true
        },
        createDate: {
            type: Date,
            default:Date.now
        }
    }
);
varietySchema.plugin(toJSON);
varietySchema.plugin(paginate);
const Variety = mongoose.model('Caliber', varietySchema);

module.exports = Variety;