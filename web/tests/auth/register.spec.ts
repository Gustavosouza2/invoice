import { expect, test, type Page } from '@playwright/test'
import { RegisterPage } from 'tests/helpers/register'

test.describe('Register', () => {
  let registerPage: RegisterPage

  test.beforeEach(async ({ page }: { page: Page }) => {
    registerPage = new RegisterPage(page)
    await page.goto('/register')
    await page.waitForURL('/register', { timeout: 10000 })
  })

  test('should disable button when name field is empty', async ({ page }) => {
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('senha123')
    await registerPage.fillName('')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when phone field is empty', async ({ page }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('senha123')
    await registerPage.fillPhoneNumber('')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when email field is empty', async ({ page }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillPassword('senha123')
    await registerPage.fillEmail('')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when password field is empty', async ({
    page,
  }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when all fields are empty', async ({ page }) => {
    await page.waitForTimeout(300)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when name has less than 3 characters', async ({
    page,
  }) => {
    await registerPage.fillName('Jo')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('senha123')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when phone has less than 9 characters', async ({
    page,
  }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('12345678')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('senha123')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when email format is invalid', async ({
    page,
  }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('email-invalido')
    await registerPage.fillPassword('senha123')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should disable button when password has less than 6 characters', async ({
    page,
  }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('12345')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()
  })

  test('should prevent submission when form has invalid data', async ({
    page,
  }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('invalid-email')
    await registerPage.fillPassword('senha123')

    await page.waitForTimeout(500)
    await registerPage.expectDisabledButton()

    const submitButton = page.getByRole('button', { name: 'REGISTRAR' })
    await expect(submitButton).toBeDisabled()

    await expect(page).toHaveURL('/register')
  })

  test('should register successfully with valid data', async ({ page }) => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    const uniqueEmail = `teste${timestamp}${random}@example.com`

    await registerPage.register(
      'João Silva',
      '11999999999',
      uniqueEmail,
      'senha123',
    )

    await registerPage.waitForLoginRedirect()
    await expect(page).toHaveURL('/login')
  })

  test('should enable button when all fields are valid', async ({ page }) => {
    await registerPage.fillName('João Silva')
    await registerPage.fillPhoneNumber('11999999999')
    await registerPage.fillEmail('teste@teste.com')
    await registerPage.fillPassword('senha123')

    await page.waitForTimeout(500)
    await expect(page.getByRole('button', { name: 'REGISTRAR' })).toBeEnabled()
  })
})
