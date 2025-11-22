import { customAlphabet } from 'nanoid';

export function isValidUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch (e) {
    return false;
  }
}

export const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;
export const generateCode = () => {
  const nano = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7);
  return nano();
};
