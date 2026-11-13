'use strict';

class BatchCollector {
  constructor({ maxBatchSize = 128, flushAfterMs = 500, onFlush }) {
    this.maxBatchSize = maxBatchSize;
    this.flushAfterMs = flushAfterMs;
    this.onFlush = onFlush;
    this.current = [];
    this.timer = null;
  }

  addSpan(span) {
    if (!span || typeof span.traceId !== 'string') {
      throw new TypeError('span.traceId is required');
    }
    this.current.push(span);
    if (this.current.length >= this.maxBatchSize) {
      this.flush();
      return;
    }
    if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.flushAfterMs);
    }
  }

  flush() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.current.length === 0) return [];
    const batch = this.current;
    this.current = [];
    if (typeof this.onFlush === 'function') this.onFlush(batch);
    return batch;
  }
}

module.exports = { BatchCollector };
