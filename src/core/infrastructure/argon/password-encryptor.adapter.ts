import argon from 'argon2'
import { type PasswordProtectionServiceOutputPort } from '@core/domain/ports/security/password-protection-service.port'

class PasswordEncryptorService implements PasswordProtectionServiceOutputPort {
  async passwordEncrypt (password: string): Promise<string> {
    return await argon.hash(password)
  }

  async validatePassword (passwordHash: string, password: string): Promise<boolean> {
    return await argon.verify(passwordHash, password)
  }
}

export const passwordEncryptorService = new PasswordEncryptorService()
