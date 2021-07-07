const { trace } = require("@opentelemetry/api")

function withSpan(tracerName, spanName, fn) {
    const tracer = trace.getTracer(tracerName)

    return async (...args) => {
        const span = tracer.startSpan(spanName)
        try {
            return await fn(...args)
        } finally {
            span.end()
        }
    }
}

module.exports = { withSpan }
