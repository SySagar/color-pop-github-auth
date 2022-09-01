const express = require('express')
const axios = require('axios')

const app = express()

const client_id = '1ef39fdba83f178b02ed'
const client_secret = '967cf1b11c695f7e7d00b98974effb719e29054a'

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.json({
        message: 'Server on'
    })
})
app.get('/callback', (req, res) => {
    console.log(req.query)
    const code = req.query.code
    axios.post(`https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`, {
        headers: {
            'Accept': 'application/vnd.github+json'
        }
    })
        .then(res => res.data)
        .then(data => {
            res.json({
                data,code
            })
        })
        .catch(err => {
            res.status(400).json({
                error: err.message
            })
        })

    // res.json({
    //     message: 'Soumya Sagar'
    // })
})

app.listen(port, () => {
    console.log('Server running...')
})

export default app