import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  role: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function accountLogin(params: LoginParamsType) {
  return request('/gserver/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      'username': params.userName,
      'password': params.password,
      'authority': params.role,
    },
  });
}