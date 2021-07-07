// NOTE: this must be the first line you import
require("./tracing").initTelemetry("service-1")

const express = require("express")
const axios = require("axios")
const { withSpan } = require("./otel-helpers")

const app = express()
const port = 3000

app.get(
    "/",
    withSpan("service-1", "GET /", async function (req, res) {
        console.log("GET /")

        const result = await axios.get("http://localhost:3001")

        console.log("GET / result", result.data)
        res.send({ data: result.data })
    }),
)

app.listen(port, () => {
    console.log(`Service-1 listening at http://localhost:${port}`)
})
