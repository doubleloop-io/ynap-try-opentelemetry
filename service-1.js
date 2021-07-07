require("./tracing").initTelemetry("service-1")
const otelApi = require("@opentelemetry/api")
const express = require("express")
const axios = require("axios")

const app = express()
const port = 3000

const tracer = otelApi.trace.getTracer("service-1")

app.get("/", async function (req, res) {
    console.log("GET /")

    const span = tracer.startSpan("service-1|get /")

    const result = await axios.get("http://localhost:3001")

    console.log("GET / result", result.data)
    res.send({ data: result.data })

    span.end()
})

app.listen(port, () => {
    console.log(`Service-1 listening at http://localhost:${port}`)
})
