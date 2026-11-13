# kestrel-batcher

This repository contains the implementation of `kestrel-batcher`, a small
utility that groups distributed trace spans into bounded batches before they
are handed to an export queue.

## Status

Released and stable. The package has been used in Silverpine's telemetry
pipeline since early 2024.

## Usage

```js
const { BatchCollector } = require('./src/batcher');
const collector = new BatchCollector({ maxBatchSize: 64, flushAfterMs: 250 });
collector.addSpan({ traceId: 'abc', name: 'db.query', durationMs: 12 });
```

## License

Apache-2.0

