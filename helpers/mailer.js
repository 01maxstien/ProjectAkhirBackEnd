const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'maxstienhosang@gmail.com',
        pass: 'mstzycvyescvrqaz'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = {
    transporter
};