import * as bcrypt from 'bcrypt';

export function hashString(str: string) {
  return bcrypt.hashSync(str, bcrypt.genSaltSync(8));
}
