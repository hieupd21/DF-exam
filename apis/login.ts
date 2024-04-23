import http from '@/lib/http';
import { LoginBodyType } from '@/schemaValidations/login.schema';

type LoginRes = {
  access_token: string;
  refresh_token: string;
};

const authApiRequest = {
  login: (body: LoginBodyType) => {
    return http.post<LoginRes>('/auth/login', body);
  },
  auth: (body: { refreshToken: string }) => {
    return http.post<LoginRes>('/auth/refresh-token', body, { baseUrl: '' });
  },
  get: () => {
    return http.get('/auth/refresh-token');
  },
};

export default authApiRequest;
