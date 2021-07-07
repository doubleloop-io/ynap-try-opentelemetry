# Simple Opentelemetry example

```bash
# Terminal 1
./start-jaeger.sh

# Terminal 2
node service-1.js

# Terminal 3
node service-2.js

# Terminal 4
# Invoke service-1 that makes an http call to service-2 which does the 'work'
curl localhost:3000
```

and open the browser at `localhost:16686`, you should see the jaeger UI

### TODO
- [ ] add React UI