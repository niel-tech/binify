import CryptoJS from "crypto-js"

export function generateHashedId(
  string = Date.now().toString(),
  key: string = process.env.NEXT_PUBLIC_SECURE_KEY as string,
  length = 5
): string {
  const hmac = CryptoJS.HmacSHA256(string, key)
  const hash = hmac.toString(CryptoJS.enc.Hex)
  return hash.substr(0, length)
}

export function generateHashedPassword(string: string): string {
  const hmac = CryptoJS.SHA256(string)
  return hmac.toString(CryptoJS.enc.Hex)
}

export function encryptText(text: string, key: string = process.env.NEXT_PUBLIC_SECURE_KEY as string) {
  const aes = CryptoJS.AES.encrypt(text, key)
  return aes.toString()
}

export function decryptText(text: string, key: string = process.env.NEXT_PUBLIC_SECURE_KEY as string) {
  const aes = CryptoJS.AES.decrypt(text, key)
  return aes.toString(CryptoJS.enc.Utf8)
}
