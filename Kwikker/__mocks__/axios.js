export default {
  post: jest.fn(() => Promise.resolve({
    response: {
      data: {}
    }
  })),
  get: jest.fn(() => Promise.resolve({
    response: {
      data: {}
    }
  })),
  delete: jest.fn(() => Promise.resolve({
    response: {
      data: {}
    }
  })),
  defaults: {
    headers: {
      common: {
        TOKEN: ''
      }
    }
  }
};