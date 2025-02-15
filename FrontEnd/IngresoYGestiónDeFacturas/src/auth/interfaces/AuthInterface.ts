export type AuthStatusType = "checking" | "not-authenticated" | "authenticated";

export interface UserInfo {
  id: string;
  nameCompany: string;
  phoneNumber: string;
  email: string;
  iva: number;
  city: string;
  regionProvince: string;
  address: string;
  zipcode: number;
}

export interface JWTInfo {
  token: string;
  expiracion: string;
  userInfo: UserInfo;
}
export interface AuthInfo {
  jwtInfo: JWTInfo;
  status: AuthStatusType;
}

export interface LoginInfo {
  userName: string;
  password: string;
}
