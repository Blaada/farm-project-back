const mongoose = require('mongoose')
const { toJSON, paginate } = require('./plugins');
const cropSchema = mongoose.Schema(
    {
        cropFarmer: {
            type: String,
            required: true,
            trim: true
        },
        cropType: {
            type: String,
            required: true,
            trim: true
        },
        cropParcel: {
            type: String,
            required: true,
            trim: true
        },
        cropVariety: {
            type: String,
            required: true,
            trim: true
        },
        cropNumberOfBoxes: {
            type: Number,
            required: true
        },
        cropRootStock: {
            type: String
        },
        cropCaliber: {
            type: String
        },
        cropExpensePrice: {
            type: Number,
            default: -1
        },
        createDate: {
            type: Date,
            default: Date.now
        }
    }
);
cropSchema.plugin(toJSON);
cropSchema.plugin(paginate);
const Crop = mongoose.model('Crop', cropSchema);

module.exports = Crop;