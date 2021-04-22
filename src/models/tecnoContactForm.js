const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tecnoContactFormSchema = new Schema(
    {
        email: {
            type: String,
        },
        message: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
)

const TecnoContactForm = mongoose.model(
    'TecnoContactForm',
    tecnoContactFormSchema
)

module.exports = TecnoContactForm
