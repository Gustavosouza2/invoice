import { expect, test, type Page } from '@playwright/test'

import { LoginPage } from '../helpers/login'
import { DashboardPage } from '../helpers/dashboard'

const TEST_USER = {
  email: 'gustavoleonsouza@gmail.com',
  password: 'senha123',
}

test.describe('Dashboard Home', () => {
  let loginPage: LoginPage
  let dashboardPage: DashboardPage

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await page.goto('/login')
    await page.waitForURL('/login', { timeout: 10000 })
    await loginPage.login(TEST_USER.email, TEST_USER.password)
    await loginPage.waitForDashboardRedirect()
  })

  test('should show home with welcome message after login', async ({
    page,
  }) => {
    await dashboardPage.goToHome()
    await expect(page.getByText(/Bem vindo de volta/)).toBeVisible({
      timeout: 10000,
    })
  })

  test('should show metrics cards on home', async ({ page }) => {
    await dashboardPage.goToHome()
    await expect(
      page.getByText('Total de Invoices', { exact: true }),
    ).toBeVisible({ timeout: 10000 })
    await expect(page.getByText('Receita Bruta', { exact: true })).toBeVisible()
    await expect(page.getByText('Clientes Únicos', { exact: true })).toBeVisible()
  })
})
