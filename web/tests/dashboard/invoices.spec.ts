import { expect, test, type Page } from '@playwright/test'

import { LoginPage } from '../helpers/login'
import { DashboardPage } from '../helpers/dashboard'
import { InvoicePage, type InvoiceFormData } from '../helpers/invoice'

const TEST_USER = {
  email: 'gustavoleonsouza@gmail.com',
  password: 'senha123',
}

test.describe('Invoices', () => {
  let loginPage: LoginPage
  let dashboardPage: DashboardPage
  let invoicePage: InvoicePage

  test.beforeEach(async ({ page }: { page: Page }) => {
    loginPage = new LoginPage(page)
    dashboardPage = new DashboardPage(page)
    invoicePage = new InvoicePage(page)
    await page.goto('/login')
    await page.waitForURL('/login', { timeout: 10000 })
    await loginPage.login(TEST_USER.email, TEST_USER.password)
    await loginPage.waitForDashboardRedirect()
    await dashboardPage.goToInvoices()
  })

  test.describe('Create Invoice', () => {
    test('should open create invoice modal when clicking Criar Nota', async ({
      page,
    }) => {
      await invoicePage.clickCreateInvoice()
      await expect(page.getByText('Modo de preenchimento')).toBeVisible()
    })

    test('should create invoice with valid data and show success toast', async () => {
      const data: InvoiceFormData = {
        invoiceNumber: String(9000 + Math.floor(Math.random() * 999)),
        issueDate: new Date().toISOString().slice(0, 10),
        customerName: 'Cliente E2E Test',
        customerCnpjOrCpf: '12345678909',
        providerName: 'Prestador E2E',
        providerCnpj: '12345678000199',
        serviceDescription: 'Serviço de teste E2E',
        serviceValue: '150,00',
      }
      await invoicePage.createInvoice(data)
      await invoicePage.expectCreateSuccessToast()
    })
  })

  test.describe('Edit Invoice', () => {
    test('should open edit modal when clicking Editar in context menu', async ({
      page,
    }) => {
      const table = page.locator('table tbody tr')
      await table
        .first()
        .waitFor({ state: 'visible', timeout: 15000 })
        .catch(() => {})
      const rowCount = await table.count()
      if (rowCount === 0) {
        test.skip()
        return
      }
      await invoicePage.editFirstInvoice()
      await expect(page.getByText('Modo de preenchimento')).toBeVisible({
        timeout: 10000,
      })
    })

    test('should update invoice when submitting edit modal', async ({
      page,
    }) => {
      const table = page.locator('table tbody tr')
      await table
        .first()
        .waitFor({ state: 'visible', timeout: 15000 })
        .catch(() => {})
      if ((await table.count()) === 0) {
        test.skip()
        return
      }
      await invoicePage.editFirstInvoice()
      await invoicePage.submitEditModal()
      await invoicePage.expectEditSuccessToast()
    })
  })

  test.describe('Delete Invoice', () => {
    test('should open delete modal when clicking Excluir in context menu', async ({
      page,
    }) => {
      const table = page.locator('table tbody tr')
      await table
        .first()
        .waitFor({ state: 'visible', timeout: 15000 })
        .catch(() => {})
      if ((await table.count()) === 0) {
        test.skip()
        return
      }
      await invoicePage.openFirstRowContextMenu()
      await invoicePage.clickContextDelete()
      await invoicePage.expectDeleteModalVisible()
    })

    test('should cancel delete when clicking CANCELAR in modal', async ({
      page,
    }) => {
      const table = page.locator('table tbody tr')
      await table
        .first()
        .waitFor({ state: 'visible', timeout: 15000 })
        .catch(() => {})
      if ((await table.count()) === 0) {
        test.skip()
        return
      }
      await invoicePage.deleteFirstInvoiceFromMenu()
      await invoicePage.expectDeleteModalVisible()
      await invoicePage.cancelDeleteModal()
      await expect(page.getByText('Excluir nota fiscal?')).not.toBeVisible()
    })

    test('should delete invoice when confirming in modal', async ({ page }) => {
      const table = page.locator('table tbody tr')
      await table
        .first()
        .waitFor({ state: 'visible', timeout: 15000 })
        .catch(() => {})
      if ((await table.count()) === 0) {
        test.skip()
        return
      }
      await invoicePage.deleteFirstInvoiceFromMenu()
      await invoicePage.expectDeleteModalVisible()
      await invoicePage.confirmDeleteModal()
      await invoicePage.expectDeleteSuccessToast()
    })
  })
})
