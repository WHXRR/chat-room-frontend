export interface LoginFormValue {
  email: string;
  password: string;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
}

export interface UpdatePassword {
  email: string;
  password: string;
  confirmPassword: string;
  captcha: string;
}