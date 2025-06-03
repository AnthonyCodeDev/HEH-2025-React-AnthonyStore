import '@testing-library/jest-dom';

declare module 'vitest' {
    export interface Assertion<T = any> extends jest.Matchers<void, T> { }
} 