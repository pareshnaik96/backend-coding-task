const express = require('express')
const route = require('./Routes/routes')

const app = express()

app.use(express.json())


app.use('/', route)


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`)
})

