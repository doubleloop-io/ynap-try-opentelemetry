// NOTE: this must be the first line you import
require("./tracing").initTelemetry("service-2")

const express = require("express")
const { withSpan } = require("./otel-helpers")
const { doWork } = require("./do-work")

const app = express()
const port = 3001

app.get(
    "/",
    withSpan("service-2", "GET /", async function (req, res) {
        const duration = await doWork()
        res.send({ hello: "World", duration })
    }),
)

app.listen(port, () => {
    console.log(`Service-2 listening at http://localhost:${port}`)
})
