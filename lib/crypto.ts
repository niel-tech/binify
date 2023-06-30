import CryptoJS from "crypto-js"

export function randomBytes() {
  return CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex)
}

export function generateMd5Hash(string: string) {
  return CryptoJS.MD5(string.trim().toLowerCase())
}

export function generateHashedString(string: string, secret?: string): string {
  const hmac = CryptoJS.SHA256(secret ? string + secret : string)
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
