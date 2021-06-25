import { ErrorhandlerMiddleware } from './errorhandler.middleware';

describe('ErrorhandlerMiddleware', () => {
  it('should be defined', () => {
    expect(new ErrorhandlerMiddleware()).toBeDefined();
  });
});
