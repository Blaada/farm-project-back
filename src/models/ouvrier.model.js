const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ouvrierSchema = mongoose.Schema(
    {
        ouvrier: {
            type: String,
            required: true
        },
        createDate: {
            type: Date,
            default:Date.now
        }
    }
);

ouvrierSchema.plugin(toJSON);
ouvrierSchema.plugin(paginate);

const Ouvrier = mongoose.model('Ouvrier', ouvrierSchema);

module.exports = Ouvrier;