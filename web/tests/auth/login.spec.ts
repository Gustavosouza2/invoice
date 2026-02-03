import { expect, type Page, test } from '@playwright/test'

import { LoginPage } from '../helpers/login'

test.describe('Login', () => {
  let loginPage: LoginPage

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page)
    await page.goto('/')
    await page.waitForURL('/login', { timeout: 10000 })
  })

  test('should disable button when password field is empty', async () => {
    await loginPage.fillEmail('teste@teste.com')
    await loginPage.fillPassword('')
    await loginPage.expectDisabledButton()
  })

  test('should disabled button when email field is empty', async () => {
    await loginPage.fillPassword('senha123')
    await loginPage.fillEmail('')
    await loginPage.expectDisabledButton()
  })

  test('should show error message toast when login with invalid credentials', async ({
    page,
  }) => {
    await loginPage.login('test@example.com', 'invalidpassword')
    await expect(page).toHaveURL('/login')
    await loginPage.expectErrorLogin()
  })

  test('should login with valid credentials', async () => {
    await loginPage.login('gustavoleonsouza@gmail.com', 'senha123')
    await loginPage.expectSuccessLogin()
  })
})
