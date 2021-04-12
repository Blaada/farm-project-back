const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const pacelSchema = mongoose.Schema(
    {
        parcel: {
            type: String,
            required: true
        }
    }
);

pacelSchema.plugin(toJSON);
pacelSchema.plugin(paginate);
const Parcel = mongoose.model('Parcel', pacelSchema);
module.exports = Parcel;