import express from 'express'
import conditions from './conditions.json'

const app = express()
const port = 5000

app.get('/conditions', (req, res) => res.send(conditions))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))