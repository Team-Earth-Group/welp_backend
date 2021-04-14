const express = require('express')
const app = express()

const routesReport = require('rowdy-logger').begin(app)
const userRoutes = require('./routes/userRoutes')
const businessRoutes = require('./routes/businessRoutes')

app.use(express.json())
app.use(require('cors')())

app.use('/users', userRoutes)
app.use('/businesses', businessRoutes)


const port = process.env.PORT || 3001
app.listen(port, () => {
    routesReport.print()
})
