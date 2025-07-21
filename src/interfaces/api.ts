import type { LoginFormValue, RegisterUser, UpdatePassword } from "@/types/user";
import { axiosInstance } from ".";

export async function login(loginUser: LoginFormValue) {
  return await axiosInstance.post('/user/login', loginUser);
}

export async function registerCaptcha(email: string) {
  return await axiosInstance.get('/user/register-captcha', {
    params: {
      email
    }
  });
}

export async function register(registerUser: RegisterUser) {
  return await axiosInstance.post('/user/register', registerUser);
}

export async function updatePasswordCaptcha(email: string) {
  return await axiosInstance.get('/user/update-password/captcha', {
    params: {
      email
    },
  });
}

export async function updatePassword(data: UpdatePassword) {
  return await axiosInstance.post('/user/update-password', data);
}