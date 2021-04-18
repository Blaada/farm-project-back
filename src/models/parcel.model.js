const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const pacelSchema = mongoose.Schema(
    {
        parcel: {
            type: String,
            required: true
        },
        createDate: {
            type: Date,
            default:Date.now
        }
    }
);

pacelSchema.plugin(toJSON);
pacelSchema.plugin(paginate);
const Parcel = mongoose.model('Parcel', pacelSchema);
module.exports = Parcel;