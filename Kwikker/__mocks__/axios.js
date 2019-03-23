export default {
  post: jest.fn(() => Promise.resolve({
    response: {
      data: {}
    }
  }))
};