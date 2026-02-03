import { expect, Page } from '@playwright/test'

export class RegisterPage {
  constructor(private readonly page: Page) {
    this.page = page
  }

  async fillName(name: string) {
    const nameInput = this.page.getByPlaceholder('Digite seu nome')
    await nameInput.waitFor({ state: 'visible', timeout: 10000 })
    await nameInput.fill(name)
  }

  async fillPhoneNumber(phone: string) {
    const phoneInput = this.page.getByPlaceholder('Digite seu telefone')
    await phoneInput.waitFor({ state: 'visible', timeout: 10000 })
    await phoneInput.fill(phone)
  }

  async fillEmail(email: string) {
    const emailInput = this.page.getByPlaceholder('Digite seu email')
    await emailInput.waitFor({ state: 'visible', timeout: 10000 })
    await emailInput.fill(email)
  }

  async fillPassword(password: string) {
    const passwordInput = this.page.getByPlaceholder('Crie sua senha')
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 })
    await passwordInput.fill(password)
  }

  async submit() {
    await this.page.getByRole('button', { name: 'REGISTRAR' }).click()
  }

  async expectDisabledButton() {
    await expect(
      this.page.getByRole('button', { name: 'REGISTRAR' }),
    ).toBeDisabled()
  }

  async expectSuccessRegister() {
    await expect(
      this.page.getByText(/Registro realizado com sucesso/i),
    ).toBeVisible({
      timeout: 10000,
    })
  }

  async expectErrorRegister() {
    await expect(this.page.getByText(/Erro ao fazer registro/i)).toBeVisible({
      timeout: 10000,
    })
  }

  async register(name: string, phone: string, email: string, password: string) {
    await this.page.waitForURL('/register', { timeout: 10000 })
    await this.page.waitForLoadState('domcontentloaded')

    await this.fillName(name)
    await this.fillPhoneNumber(phone)
    await this.fillEmail(email)
    await this.fillPassword(password)

    const submitButton = this.page.getByRole('button', { name: 'REGISTRAR' })
    await expect(submitButton).toBeEnabled({ timeout: 5000 })

    await this.submit()
  }
}
