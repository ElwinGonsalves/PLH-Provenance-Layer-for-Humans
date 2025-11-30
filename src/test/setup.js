import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock URL.createObjectURL and URL.revokeObjectURL for file upload tests
global.URL.createObjectURL = (file) => `blob:mock-url-${file.name}`;
global.URL.revokeObjectURL = () => {};

// Cleanup after each test
afterEach(() => {
  cleanup();
});
