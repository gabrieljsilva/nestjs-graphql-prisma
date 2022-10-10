import * as bcrypt from 'bcrypt';

export function compareHashString(hash: string, str: string) {
  return bcrypt.compareSync(str, hash);
}
