const { trace, context } = require("@opentelemetry/api")

function withSpan(tracerName, spanName, fn) {
    const tracer = trace.getTracer(tracerName)

    return async (...args) => {
        const span = tracer.startSpan(spanName)

        const ctx = trace.setSpan(context.active(), span)
        return context.with(ctx, async () => {
            try {
                return await fn(...args)
            } finally {
                span.end()
            }
        })
    }
}

module.exports = { withSpan }
