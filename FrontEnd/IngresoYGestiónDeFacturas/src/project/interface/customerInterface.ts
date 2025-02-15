export interface Customer {
  id: string | null;
  identification: string;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string | null;
  active: boolean | null;
}
