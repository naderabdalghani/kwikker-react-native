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
  }))
};