const { ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { NodeTracerProvider } = require('@opentelemetry/node')
const { Resource } = require("@opentelemetry/resources");
const { ResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { registerInstrumentations } = require('@opentelemetry/instrumentation')
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger")

function initTelemetry(serviceName) {

const provider = new NodeTracerProvider({
    resource: new Resource({
        [ResourceAttributes.SERVICE_NAME]: serviceName,
    }),
});

// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.addSpanProcessor(new SimpleSpanProcessor(new JaegerExporter()))

provider.register()

registerInstrumentations({
    instrumentations: [
        getNodeAutoInstrumentations(),
    ],
})

}

module.exports = { initTelemetry }
