import { expect, Page } from '@playwright/test'

export class DashboardPage {
  constructor(private readonly page: Page) {
    this.page = page
  }

  async expectOnDashboard() {
    await expect(this.page).toHaveURL(/\/dashboard/, { timeout: 15000 })
  }

  async goToHome() {
    await this.page.goto('/dashboard/home')
    await this.page.waitForURL('/dashboard/home', { timeout: 10000 })
  }

  async goToInvoices() {
    await this.page.goto('/dashboard/invoices')
    await this.page.waitForURL('/dashboard/invoices', { timeout: 10000 })
  }

  async openUserMenu() {
    const trigger = this.page.locator('header').getByRole('button').last()
    await trigger.waitFor({ state: 'visible', timeout: 10000 })
    await trigger.click()
    await this.page
      .getByText('Sair')
      .waitFor({ state: 'visible', timeout: 5000 })
  }

  async logout() {
    await this.openUserMenu()
    await this.page.getByRole('button', { name: 'Sair' }).click()
  }

  async expectRedirectToLogin() {
    await expect(this.page).toHaveURL('/login', { timeout: 10000 })
  }
}
