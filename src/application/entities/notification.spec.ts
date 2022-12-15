import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('it should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Hello!'),
      recipientId: '123',
      category: 'any',
    });

    expect(notification).toBeTruthy();
  });
});
