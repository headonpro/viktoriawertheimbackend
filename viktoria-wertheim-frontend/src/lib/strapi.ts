import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export const strapi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
  },
});

// API-Endpunkte
export const API_ENDPOINTS = {
  newsArtikel: '/news-artikels',
  kategorien: '/kategorien',
  mannschaften: '/mannschaften',
  spieler: '/spielers',
  spiele: '/spiels',
} as const;

// Typen für API-Responses
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
}

// Hilfsfunktionen für API-Calls
export const apiRequest = {
  get: <T>(endpoint: string, params?: Record<string, any>) =>
    strapi.get<StrapiResponse<T>>(endpoint, { params }),
  
  post: <T>(endpoint: string, data: any) =>
    strapi.post<StrapiResponse<T>>(endpoint, { data }),
  
  put: <T>(endpoint: string, data: any) =>
    strapi.put<StrapiResponse<T>>(endpoint, { data }),
  
  delete: <T>(endpoint: string) =>
    strapi.delete<StrapiResponse<T>>(endpoint),
}; 