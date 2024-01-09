export interface PasswordEncryptorOutputPort {
  passwordEncrypt: (password: string) => Promise<string>
  validatePassword: (passwordHash: string, password: string) => Promise<boolean>
}
