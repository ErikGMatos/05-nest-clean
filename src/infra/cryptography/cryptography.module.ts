import { Module } from '@nestjs/common'

import { Encrypter } from '@/domain/forum/application/cryptograph/encrypter'
import { HashCompare } from '@/domain/forum/application/cryptograph/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptograph/hash-generator'

import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashCompare, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashCompare, HashGenerator],
})
export class CryptographyModule {}
