import { createHash } from 'crypto';
import globalDataSetter from './cookies/globalDataSetter';

export function hashingEmail(email: string): void {
  const hash = createHash('sha256');
  hash.update(email);
  const hashed = hash.digest('hex');
  globalDataSetter('HUE', hashed);
}
