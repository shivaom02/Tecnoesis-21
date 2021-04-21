const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactFormSchema = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const ContactForm = mongoose.model( 'ContactForm' , contactFormSchema );

module.exports = ContactForm;