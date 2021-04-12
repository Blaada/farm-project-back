const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const outgoingSchema = mongoose.Schema(
    {
        outgoingType: {
            type: String,
            required: true,
            trim: true
        },
        outgoingLabel: {
            type: String,
            required: true,
            trim: true
        },
        outgoingQuantity: {
            type: Number,
            required: true
        },
        outgoingUnitOfMesure: {
            type: String,
            required: true
        },
        outgoingPrice: {
            type: Number,
            required: true
        },
    }
);
outgoingSchema.plugin(toJSON);
outgoingSchema.plugin(paginate);
const Outgoing = mongoose.model('Outgoing', outgoingSchema)

module.exports = Outgoing