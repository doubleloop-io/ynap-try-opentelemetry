const otelApi = require("@opentelemetry/api")

const tracer = otelApi.trace.getTracer("service-2|do-work-tracer")

const sleep = (timeInMs) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(timeInMs) }, timeInMs)
    })
}

const doWork = async () => {
    let span = tracer.startSpan("do-work");
    const duration = Math.random() * 10000

    console.log("do work - start", duration)
    await sleep(duration)
    console.log("do work - end")

    span.end()
    return duration
}

module.exports = { doWork }