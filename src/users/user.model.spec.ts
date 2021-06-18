import { User } from './user.model';

describe('UserModel', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
