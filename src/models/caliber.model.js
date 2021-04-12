const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const caliberSchema = mongoose.Schema(
    {
        caliber: {
            type: String,
            required: true
        }
    }
);

caliberSchema.plugin(toJSON);
caliberSchema.plugin(paginate);

const Caliber = mongoose.model('Caliber', caliberSchema);

module.exports = Caliber;