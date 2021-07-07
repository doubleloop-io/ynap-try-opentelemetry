require("./tracing").initTelemetry("service-2")
const otelApi = require("@opentelemetry/api")
const express = require("express")
const { doWork } = require("./do-work")

const app = express()
const port = 3001

const tracer = otelApi.trace.getTracer("service-2")

app.get("/", async function (req, res) {
    const span = tracer.startSpan("service-2|get /")
    const ctx = otelApi.trace.setSpan(otelApi.context.active(), span)

    const duration = await otelApi.context.with(ctx, async () => {
        return await doWork()
    })

    //const doWorkWrapped = wrapWithTelemetry(doWork)
    //await doWorkWrapped()

    res.send({ hello: "World", duration })

    span.end()
})

app.listen(port, () => {
    console.log(`Service-2 listening at http://localhost:${port}`)
})
