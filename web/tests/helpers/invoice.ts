import { expect, Page } from '@playwright/test'

export type InvoiceFormData = {
  invoiceNumber?: string
  issueDate?: string
  customerName?: string
  customerCnpjOrCpf?: string
  customerEmail?: string
  providerName?: string
  providerCnpj?: string
  serviceDescription?: string
  serviceValue?: string
}

export class InvoicePage {
  constructor(private readonly page: Page) {
    this.page = page
  }

  async clickCreateInvoice() {
    await this.page.getByRole('button', { name: 'Criar Nota' }).click()
    await this.page
      .getByText('Modo de preenchimento')
      .waitFor({ state: 'visible', timeout: 10000 })
  }

  // --- Step 1: SelectType ---
  async selectManualTypeAndContinue() {
    await this.page.getByRole('button', { name: 'MANUAL' }).click()
    await this.page.getByRole('button', { name: 'CONTINUAR' }).click()
    await this.page
      .getByText('Detalhes da Nota')
      .waitFor({ state: 'visible', timeout: 5000 })
  }

  // --- Step 2: InvoiceDetails ---
  async fillInvoiceDetails(invoiceNumber: string, issueDate: string) {
    await this.page
      .getByPlaceholder('Digite o número da nota')
      .fill(invoiceNumber)
    await this.page
      .getByPlaceholder('Digite a Data da nota (DD/MM/YYYY)')
      .fill(issueDate)
    await this.page.getByRole('button', { name: 'CONTINUAR' }).click()
    await this.page
      .getByText('Detalhes do Cliente')
      .waitFor({ state: 'visible', timeout: 5000 })
  }

  async fillCustomerDetails(
    customerName: string,
    customerCnpjOrCpf: string,
    customerEmail = '',
  ) {
    await this.page
      .getByPlaceholder('Digite o nome do cliente')
      .fill(customerName)
    await this.page
      .getByPlaceholder('Digite o CPF ou CNPJ do cliente')
      .fill(customerCnpjOrCpf)
    if (customerEmail) {
      await this.page
        .getByPlaceholder('Digite o email do cliente (opcional)')
        .fill(customerEmail)
    }
    await this.page.getByRole('button', { name: 'CONTINUAR' }).click()
    await this.page
      .getByText('Dados do Prestador')
      .waitFor({ state: 'visible', timeout: 5000 })
  }

  async fillProviderDetails(providerName: string, providerCnpj: string) {
    await this.page
      .getByPlaceholder('Digite o nome do prestador')
      .fill(providerName)
    await this.page
      .getByPlaceholder('Digite o CNPJ do prestador')
      .fill(providerCnpj)
    await this.page.getByRole('button', { name: 'CONTINUAR' }).click()
    await this.page
      .getByText('Detalhes do Serviço')
      .waitFor({ state: 'visible', timeout: 5000 })
  }

  async fillServiceDetailsAndSubmit(
    serviceDescription: string,
    serviceValue: string,
  ) {
    await this.page
      .getByPlaceholder('Digite a descrição do serviço')
      .fill(serviceDescription)
    await this.page
      .getByPlaceholder('Digite o valor do serviço')
      .fill(serviceValue)
    await this.page.getByRole('button', { name: 'ENVIAR' }).click()
  }

  async createInvoice(data: InvoiceFormData) {
    await this.clickCreateInvoice()
    await this.selectManualTypeAndContinue()
    await this.fillInvoiceDetails(
      data.invoiceNumber ?? '1001',
      data.issueDate ?? new Date().toISOString().slice(0, 10),
    )
    await this.fillCustomerDetails(
      data.customerName ?? 'Cliente E2E',
      data.customerCnpjOrCpf ?? '12345678909',
      data.customerEmail,
    )
    await this.fillProviderDetails(
      data.providerName ?? 'Prestador E2E',
      data.providerCnpj ?? '12345678000199',
    )
    await this.fillServiceDetailsAndSubmit(
      data.serviceDescription ?? 'Serviço de teste E2E',
      data.serviceValue ?? '100,00',
    )
  }

  async expectCreateSuccessToast() {
    await expect(
      this.page.getByText('Nota fiscal criada com sucesso!'),
    ).toBeVisible({
      timeout: 15000,
    })
  }

  async expectEditSuccessToast() {
    await expect(
      this.page.getByText('Nota fiscal atualizada com sucesso!'),
    ).toBeVisible({
      timeout: 15000,
    })
  }

  async expectDeleteSuccessToast() {
    await expect(
      this.page.getByText('Nota fiscal excluída com sucesso!'),
    ).toBeVisible({
      timeout: 15000,
    })
  }

  async submitEditModal() {
    for (let i = 0; i < 4; i++) {
      const btn = this.page.getByRole('button', { name: 'CONTINUAR' })
      await btn.waitFor({ state: 'visible', timeout: 3000 })
      await btn.click()
    }
    await this.page
      .getByRole('button', { name: 'ENVIAR' })
      .waitFor({ state: 'visible', timeout: 5000 })
    await this.page.getByRole('button', { name: 'ENVIAR' }).click()
  }

  async openFirstRowContextMenu() {
    const firstRow = this.page.locator('table tbody tr').first()
    const kebab = firstRow.getByRole('button')
    await kebab.waitFor({ state: 'visible', timeout: 10000 })
    await kebab.click()
  }

  async clickContextEdit() {
    await this.page.getByRole('menuitem', { name: 'Editar' }).click()
  }

  async clickContextDelete() {
    await this.page.getByRole('menuitem', { name: 'Excluir' }).click()
  }

  async editFirstInvoice() {
    await this.openFirstRowContextMenu()
    await this.clickContextEdit()
    await this.page
      .getByText('Modo de preenchimento')
      .waitFor({ state: 'visible', timeout: 5000 })
  }

  async deleteFirstInvoiceFromMenu() {
    await this.openFirstRowContextMenu()
    await this.clickContextDelete()
  }

  async confirmDeleteModal() {
    await this.page.getByRole('button', { name: 'EXCLUIR' }).click()
  }

  async cancelDeleteModal() {
    await this.page.getByRole('button', { name: 'CANCELAR' }).click()
  }

  async expectDeleteModalVisible() {
    await expect(this.page.getByText('Excluir nota fiscal?')).toBeVisible({
      timeout: 5000,
    })
  }

  async clickFirstRowToEdit() {
    await this.page.locator('table tbody tr').first().click()
  }
}
