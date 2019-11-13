const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const crypto = require('crypto')
const { transporter } = require('./helpers/mailer')
const bearerToken = require('express-bearer-token')

const app = express()
const port = process.env.PORT || 2019

app.use(bodyParser.json())
app.use(cors())
app.use(bearerToken())
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome To our API</h1>')
})

const { userRouter, 
    categoryRouter, 
    productRouter,
    beritaRouter,
    galleryFotoRouter,
    galleryVideoRouter,
    playerRouter,
    posisiplayerRouter,
    cartRouter,
    matchRouter,
    timRouter
    } = require('./routers')

app.use('/user', userRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/berita', beritaRouter)
app.use('/galleryFoto', galleryFotoRouter)
app.use('/galleryVideo', galleryVideoRouter)
app.use('/player', playerRouter)
app.use('/posisiplayer', posisiplayerRouter)
app.use('/cart',cartRouter)
app.use('/match',matchRouter)
app.use('/tim',timRouter)


app.get('/sendmail', (req,res) => {
    var mailOption = {
        from: "Admin Persipura<maxstienhosang@gmail.com>",
        to: "maxbibir@ymail.com",
        subject: "Undangan Bergabung",
        html: `Bergabunglah menjadi member Toko Berkah dengan
            mengclick link ini  <a href="https://google.com">Bergabung</a>`
    }

    transporter.sendMail(mailOption, (err,results) => {
        if(err) return res.status(500).send(err)

        res.status(200).send({ status: 'Send Email Success', result: results})
    })
})


app.get('/testencrypt', (req,res) => {
    const secret = 'teletubies';
    const hash = crypto.createHmac('sha256', secret)
                    .update('abc')
                    .digest('hex');
    console.log(hash.length)
    res.status(200).send(hash)   
})


app.listen(port, () => console.log(`API aktif di port ${port}`))