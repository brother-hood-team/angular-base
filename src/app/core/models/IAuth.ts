export interface ILogin {
  username: string;
  password: string;
}
export interface IToken {
  access_token: string;
  expires_in: number;
  jti: string;
  refresh_token: string;
  scope: string;
  token_type: string;
}
export interface IUser {
  user_name: string;
  scope: string[];
  authorities: string[];
  aud: string[];
  client_id: string;
  jti: string;
  exp: number;
}
export interface IAuthState {
  user_credentials: IUser | null;
  isLogin: boolean;
  errorMessage: string;
}
