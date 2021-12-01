const express = require("express")
const path = require("path")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    console.log(__dirname)
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.use('/js', express.static(path.join(__dirname, '../scripts.js')))
app.use('/styles', express.static(path.join(__dirname, '../styles.css')))
app.use('/img', express.static(path.join(__dirname, '../img')))

const users = []
let globalId = 1
app.post('/register', (req, res) => {
    console.log('Registering email')
    let {email} = req.body
    let newUser = {
        id: globalId,
        email
    }
    console.log(newUser)
    users.push(newUser)
    res.status(200).send(newUser)

    globalId++
    return
})

const port = process.env.PORT || 5005

app.listen(port, () => {
    console.log(`Jammin' on port ${port}`)
})