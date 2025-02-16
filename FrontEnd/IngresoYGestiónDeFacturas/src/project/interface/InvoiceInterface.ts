export interface Invoice {
  id: string | null;
  number: number;
  companyId: string;
  customerId: string;
  sellerId: string;
  paymentMethod: string;
  paymentStatus: string;
  subTotal: number;
  iva: number;
  total: number;
  createdAt: string | null;
  invoiceDetails: InvoiceDetail[];
}

export interface InvoiceDetail {
  id: string | null;
  invoiceId: string | null;
  productId: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
}
