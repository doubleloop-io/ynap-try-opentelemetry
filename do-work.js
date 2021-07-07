const { withSpan } = require("./otel-helpers")

const sleep = (timeInMs) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(timeInMs)
        }, timeInMs)
    })
}

const doWork = async () => {
    const duration = Math.random() * 10000

    console.log("do work - start", duration)
    await sleep(duration)
    console.log("do work - end")

    return duration
}

module.exports = { doWork: withSpan("service-2", "do-work", doWork) }
