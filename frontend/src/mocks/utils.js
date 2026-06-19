/** Simulated network latency for mock API calls */
export const mockDelay = (ms = 280) => new Promise((resolve) => setTimeout(resolve, ms));

export const clone = (value) => JSON.parse(JSON.stringify(value));
