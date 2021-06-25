import { ErrorConverterMiddleware } from './error-converter.middleware';

describe('ErrorConverterMiddleware', () => {
  it('should be defined', () => {
    expect(new ErrorConverterMiddleware()).toBeDefined();
  });
});
