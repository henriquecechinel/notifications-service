import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipient Notifications', () => {
  test('it should be able to count the recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id-one' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id-one' }),
    );
    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-id-two' }),
    );

    const firstCount = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-one',
    });

    const secondCount = await countRecipientNotifications.execute({
      recipientId: 'recipient-id-two',
    });

    expect(firstCount.count).toEqual(2);
    expect(secondCount.count).toEqual(1);
  });
});
