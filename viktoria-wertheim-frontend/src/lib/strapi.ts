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

// API-Endpunkte für Content Types
export const API_ENDPOINTS = {
  // Content Types
  mitglieder: '/mitglieds',
  mannschaften: '/mannschafts',
  spielers: '/spielers',
  trainings: '/trainings',
  
  // Custom Endpoints
  mannschaft: {
    withTrainers: '/mannschafts/with-trainers',
    active: '/mannschafts/active',
    byAgeGroup: '/mannschafts/by-age-group',
    details: (id: number) => `/mannschafts/${id}/details`
  },
  
  spieler: {
    stats: (id: number) => `/spielers/${id}/stats`,
    byTeam: (teamId: number) => `/spielers/by-team/${teamId}`,
    topScorers: '/spielers/top-scorers',
    byPosition: (position: string) => `/spielers/by-position/${position}`,
    injured: '/spielers/injured'
  },
  
  training: {
    create: '/trainings/create-training',
    byTeam: (teamId: number) => `/trainings/by-team/${teamId}`,
    upcoming: '/trainings/upcoming',
    attendance: (id: number) => `/trainings/${id}/attendance`,
    complete: (id: number) => `/trainings/${id}/complete`,
    byTrainer: (trainerId: number) => `/trainings/by-trainer/${trainerId}`
  },

  mitglied: {
    register: '/mitglieds/register',
    profile: '/mitglieds/profile',
    updateProfile: '/mitglieds/update-profile'
  }
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

// Erweiterte Hilfsfunktionen für API-Calls
export const apiRequest = {
  get: <T>(endpoint: string, params?: Record<string, any>) =>
    strapi.get<StrapiResponse<T>>(endpoint, { params }),
  
  post: <T>(endpoint: string, data: any) =>
    strapi.post<StrapiResponse<T>>(endpoint, { data }),
  
  put: <T>(endpoint: string, data: any) =>
    strapi.put<StrapiResponse<T>>(endpoint, { data }),
  
  delete: <T>(endpoint: string) =>
    strapi.delete<StrapiResponse<T>>(endpoint),

  // Custom endpoint calls (ohne /data wrapper)
  customGet: <T>(endpoint: string, params?: Record<string, any>) =>
    strapi.get<T>(endpoint, { params }),
  
  customPost: <T>(endpoint: string, data: any) =>
    strapi.post<T>(endpoint, data),
  
  customPut: <T>(endpoint: string, data: any) =>
    strapi.put<T>(endpoint, data),
}; 