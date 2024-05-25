import { Notification } from '../../enterprise/entities/notification'

export interface NotificationsRepository {
  findById: (id: string) => Promise<Notification | null>
  create: (notification: Notification) => Promise<void>
  save: (notification: Notification) => Promise<void>
  // count: () => Promise<number>
  // find: () => Promise<Notification[]>
  // delete: (id: string) => Promise<void>
}
