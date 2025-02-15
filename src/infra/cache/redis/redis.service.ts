import { EnvService } from '@/infra/env/env.service'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor(envService: EnvService) {
    const useTLS = envService.get('REDIS_USE_TLS') === 'true'
    super({
      host: envService.get('REDIS_HOST'),
      port: envService.get('REDIS_PORT'),
      db: envService.get('REDIS_DB'),
      tls: useTLS ? {} : undefined,
    })
  }

  onModuleDestroy() {
    return this.disconnect()
  }
}
