import { hash, compare } from 'bcryptjs'

import { HashCompare } from '@/domain/forum/application/cryptograph/hash-compare'
import { HashGenerator } from '@/domain/forum/application/cryptograph/hash-generator'

export class BcryptHasher implements HashGenerator, HashCompare {
  private HASH_SALT_LENGTH = 8

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
