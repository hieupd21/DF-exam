import envConfig from '@/config';

type CustomOptions = RequestInit & {
  baseUrl?: string;
};

class HttpError extends Error {
  status: number;
  payload: any;

  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions
) => {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders = {
    'Content-Type': 'application/json',
  };
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options?.baseUrl;
  const fullUrl = `${baseUrl}${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  const payload: Response = await response.json();

  const data = {
    status: response.status,
    payload,
  };

  if (!response.ok) {
    throw new HttpError(data);
  }

  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'>
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'>) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'>
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
};

export default http;
