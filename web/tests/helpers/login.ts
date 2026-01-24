import { expect, Page } from '@playwright/test'

export class LoginPage {
  constructor(private readonly page: Page) {
    this.page = page
  }

  async fillEmail(email: string) {
    const emailInput = this.page.getByPlaceholder('Email')
    await emailInput.waitFor({ state: 'visible', timeout: 10000 })
    await emailInput.fill(email)
  }

  async fillPassword(password: string) {
    const passwordInput = this.page.getByPlaceholder('Senha')
    await passwordInput.waitFor({ state: 'visible', timeout: 10000 })
    await passwordInput.fill(password)
  }

  async submit() {
    await this.page.getByRole('button', { name: 'ENTRAR' }).click()
  }

  async expectSuccessLogin() {
    await expect(this.page.getByText(/Bem vindo de volta/i)).toBeVisible()
  }

  async expectErrorLogin() {
    await this.page.waitForURL('/login')
  }

  async login(email: string, password: string) {
    await this.page.waitForURL('/login', { timeout: 50000 })
    await this.page.waitForLoadState('domcontentloaded')

    await this.fillEmail(email)
    await this.fillPassword(password)
    await this.submit()
  }
}
