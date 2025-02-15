export interface Product {
  id: string | null;
  code: string;
  name: string;
  quantity: number;
  unitPrice: number;
  createdAt: string | null;
  active: boolean | null;
}
