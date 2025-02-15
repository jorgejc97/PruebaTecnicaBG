export interface Invoice {
  id: string | null;
  number: number;
  companyId: string;
  customerId: string;
  sellerId: string;
  paymentMethodId: string;
  paymentStatusId: string;
  subTotal: number;
  iva: number;
  total: number;
  createdAt: string | null;
  invoiceDetail: InvoiceDetail[];
}

export interface InvoiceDetail {
  id: string | null;
  productId: string | null;
  quantity: number;
  unitPrice: number;
  total: number;
}

export const Facturas: Invoice[] = [
  {
    id: "a1b2c3d4-5678-9012-3456-7890abcdef01",
    number: 1,
    companyId: "11111111-2222-3333-4444-555555555555",
    customerId: "66666666-7777-8888-9999-000000000000",
    sellerId: "aaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    paymentMethodId: "ffffffff-1111-2222-3333-444444444444",
    paymentStatusId: "55555555-6666-7777-8888-999999999999",
    subTotal: 150,
    iva: 12,
    total: 168,
    createdAt: "2025-02-15T20:05:00.000Z",
    invoiceDetail: [
      {
        id: "abcd1234-5678-9012-3456-7890abcdef02",
        productId: "12345678-9012-3456-7890-abcdefabcdef",
        quantity: 2,
        unitPrice: 75,
        total: 150,
      },
    ],
  },
  {
    id: "b2c3d4e5-6789-0123-4567-890abcdef123",
    number: 2,
    companyId: "22222222-3333-4444-5555-666666666666",
    customerId: "77777777-8888-9999-0000-111111111111",
    sellerId: "bbbbbbbb-cccc-dddd-eeee-ffffffffffff",
    paymentMethodId: "66666666-7777-8888-9999-000000000000",
    paymentStatusId: "88888888-9999-0000-1111-222222222222",
    subTotal: 99,
    iva: 8,
    total: 107,
    createdAt: "2025-02-15T20:06:00.000Z",
    invoiceDetail: [
      {
        id: "efgh5678-9012-3456-7890-abcdefabcdef",
        productId: "34567890-1234-5678-9012-abcdefabcdef",
        quantity: 1,
        unitPrice: 99,
        total: 99,
      },
    ],
  },
  {
    id: "c3d4e5f6-7890-1234-5678-90abcdef1234",
    number: 3,
    companyId: "33333333-4444-5555-6666-777777777777",
    customerId: "88888888-9999-0000-1111-222222222222",
    sellerId: "cccccccc-dddd-eeee-ffff-000000000000",
    paymentMethodId: "77777777-8888-9999-0000-111111111111",
    paymentStatusId: "99999999-0000-1111-2222-333333333333",
    subTotal: 250,
    iva: 20,
    total: 270,
    createdAt: "2025-02-15T20:07:00.000Z",
    invoiceDetail: [
      {
        id: "ijkl9012-3456-7890-abcdefabcdefabcd",
        productId: "56789012-3456-7890-1234-abcdefabcdef",
        quantity: 5,
        unitPrice: 50,
        total: 250,
      },
    ],
  },
  {
    id: "d4e5f6g7-8901-2345-6789-0abcdef12345",
    number: 4,
    companyId: "44444444-5555-6666-7777-888888888888",
    customerId: "99999999-0000-1111-2222-333333333333",
    sellerId: "dddddddd-eeee-ffff-0000-111111111111",
    paymentMethodId: "88888888-9999-0000-1111-222222222222",
    paymentStatusId: "00000000-1111-2222-3333-444444444444",
    subTotal: 320,
    iva: 25,
    total: 345,
    createdAt: "2025-02-15T20:08:00.000Z",
    invoiceDetail: [
      {
        id: "mnop3456-7890-abcdefabcdefabcdef",
        productId: "78901234-5678-9012-3456-abcdefabcdef",
        quantity: 3,
        unitPrice: 106,
        total: 320,
      },
    ],
  },
  {
    id: "e5f6g7h8-9012-3456-7890-abcdef123456",
    number: 5,
    companyId: "55555555-6666-7777-8888-999999999999",
    customerId: "00000000-1111-2222-3333-444444444444",
    sellerId: "eeeeeeee-ffff-0000-1111-222222222222",
    paymentMethodId: "99999999-0000-1111-2222-333333333333",
    paymentStatusId: "11111111-2222-3333-4444-555555555555",
    subTotal: 79,
    iva: 6,
    total: 85,
    createdAt: "2025-02-15T20:09:00.000Z",
    invoiceDetail: [
      {
        id: "qrst6789-0123-4567-890a-bcdefabcdef",
        productId: "90123456-7890-1234-5678-abcdefabcdef",
        quantity: 4,
        unitPrice: 19,
        total: 79,
      },
    ],
  },
];
