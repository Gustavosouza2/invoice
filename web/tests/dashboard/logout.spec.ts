import { expect, test, type Page } from '@playwright/test'

import { LoginPage } from '../helpers/login'
import { User } from 'tests/constants/userAuth'
import { DashboardPage } from '../helpers/dashboard'

test.describe('Logout', () => {
  let loginPage: LoginPage
  let dashboardPage: DashboardPage

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    await page.goto('/login')
    await page.waitForURL('/login', { timeout: 10000 })
    await loginPage.login(User.email, User.password)
    await loginPage.waitForDashboardRedirect()
  })

  test('should redirect to login when user clicks Sair', async ({ page }) => {
    await dashboardPage.logout()
    await dashboardPage.expectRedirectToLogin()
    await expect(page).toHaveURL('/login')
  })

  test('should open user menu and show Sair option', async ({ page }) => {
    await dashboardPage.openUserMenu()
    await expect(page.getByText('Sair')).toBeVisible()
  })
})
