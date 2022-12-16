import { CancelNotification } from './cancel-notification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from './errors/notification-not-found';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count Recipient Notification', () => {
  test('it should be able to count the recipients notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('This is a random content!'),
        recipientId: 'recipient-id-one',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('This is a random content!'),
        recipientId: 'recipient-id-one',
      }),
    );

    await notificationRepository.create(
      new Notification({
        category: 'social',
        content: new Content('This is a random content!'),
        recipientId: 'recipient-id-two',
      }),
    );

    const firstCount = await countRecipientNotification.execute({
      recipientId: 'recipient-id-one',
    });

    const secondCount = await countRecipientNotification.execute({
      recipientId: 'recipient-id-two',
    });

    expect(firstCount.count).toEqual(2);
    expect(secondCount.count).toEqual(1);
  });
});
