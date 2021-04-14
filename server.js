const express = require('express')
const app = express()
const routesReport = require('rowdy-logger').begin(app)
const bussinessRouter = require('./routes/businessRoute')

app.use(express.json())
app.use(require('cors')())

app.use('/businesses', bussinessRouter)


const port = process.env.PORT || 3001
app.listen(port, () => {
    routesReport.print()
})