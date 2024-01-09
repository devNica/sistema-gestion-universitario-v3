import { type PasswordEncryptorOutputPort } from '@core/ports/security/password-encryptor-output.port'
import argon from 'argon2'

class PasswordEncryptorService implements PasswordEncryptorOutputPort {
  async passwordEncrypt (password: string): Promise<string> {
    return await argon.hash(password)
  }

  async validatePassword (passwordHash: string, password: string): Promise<boolean> {
    return await argon.verify(passwordHash, password)
  }
}

export const passwordEncryptorService = new PasswordEncryptorService()
