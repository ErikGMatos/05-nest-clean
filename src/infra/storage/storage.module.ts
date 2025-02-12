import { Module } from '@nestjs/common'

import { Uploader } from '@/domain/forum/application/storage/uploader'
import { R2SStorage } from './r2-storage'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [EnvModule],
  providers: [{ provide: Uploader, useClass: R2SStorage }],
  exports: [Uploader],
})
export class StorageModule {}
