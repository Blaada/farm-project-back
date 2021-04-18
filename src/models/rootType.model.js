const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rootTypeSchema = mongoose.Schema(
    {
        rootType: {
            type: String,
            required: true
        },
        parcel: {
            type: Boolean,
            required: true
        },
        variety: {
            type: Boolean,
            required: true
        },
        rootStock: {
            type: Boolean,
            required: true
        },
        caliber: {
            type: Boolean,
            required: true
        },
        createDate: {
            type: Date,
            default:Date.now
        }
    }
);
rootTypeSchema.plugin(toJSON);
rootTypeSchema.plugin(paginate);
const RootType = mongoose.model('RootType', rootTypeSchema);

module.exports = RootType;