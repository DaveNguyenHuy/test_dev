// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('@firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  addDoc: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  getFirestore: jest.fn()
}));
