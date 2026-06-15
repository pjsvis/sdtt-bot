# Local Endpoint Configuration

The configuration must default to a localized loopback address, parameterized via standard environment variables:

```typescript
const API_URL = process.env.SDTT_API_URL || 'http://localhost:11434/v1'; // Default Ollama/NIM port
const MODEL_NAME = process.env.SDTT_MODEL || 'llama3';
```