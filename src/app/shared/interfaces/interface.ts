export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
}

export interface FbResponse {
  name: string;
}

export interface Users {
  email: string;
  agree: string;
  password: string;
  name: string;
  id?: string;
}
