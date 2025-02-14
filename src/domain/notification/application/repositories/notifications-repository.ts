import { Notification } from '../../enterprise/entities/notification'

export abstract class NotificationsRepository {
  abstract findById: (id: string) => Promise<Notification | null>
  abstract create: (notification: Notification) => Promise<void>
  abstract save: (notification: Notification) => Promise<void>
  // count: () => Promise<number>
  // find: () => Promise<Notification[]>
  // delete: (id: string) => Promise<void>
}
