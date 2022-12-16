import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient Notifications', () => {
  test('it should be able to get the recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const firstGet = await getRecipientNotifications.execute({
      recipientId: 'recipient-id-one',
    });

    const secondGet = await getRecipientNotifications.execute({
      recipientId: 'recipient-id-two',
    });

    expect(firstGet.notifications).toHaveLength(2);
    expect(firstGet.notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-id-one' }),
        expect.objectContaining({ recipientId: 'recipient-id-one' }),
      ]),
    );

    expect(secondGet.notifications).toHaveLength(1);
  });
});
