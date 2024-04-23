import '@testing-library/jest-dom/vitest';
import React from 'react';

global.React = React;

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

window.HTMLElement.prototype.scrollIntoView = vi.fn();