import axios from "axios";
import { API_URL } from "./constants";
import type {
  Event,
  Poll,
  PollOption,
  VoteRequest,
  VoteResponse,
  PollResults,
  Question,
  QuestionRequest,
  EventAnalytics,
  UssdCallbackPayload,
  UssdCallbackResponse,
  User,
} from "@/types";

// ============================================
// Axios Instance
// Configure base URL, timeouts, interceptors
// ============================================
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor — attach auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vb_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("vb_token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================
export const authApi = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api.post<{ user: User; token: string }>("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    api.post<{ user: User; token: string }>("/auth/login", data),

  logout: () => api.post("/auth/logout"),

  me: () => api.get<User>("/auth/me"),
};

// ============================================
// EVENTS API
// ============================================
export const eventsApi = {
  list: () => api.get<Event[]>("/events"),

  get: (id: string) => api.get<Event>(`/events/${id}`),

  create: (data: Partial<Event>) => api.post<Event>("/events", data),

  update: (id: string, data: Partial<Event>) => api.put<Event>(`/events/${id}`, data),

  delete: (id: string) => api.delete(`/events/${id}`),

  publish: (id: string) => api.post(`/events/${id}/publish`),

  close: (id: string) => api.post(`/events/${id}/close`),
};

// ============================================
// POLLS API
// ============================================
export const pollsApi = {
  list: (eventId: string) => api.get<Poll[]>(`/events/${eventId}/polls`),

  get: (id: string) => api.get<Poll>(`/polls/${id}`),

  create: (eventId: string, data: Partial<Poll>) =>
    api.post<Poll>(`/events/${eventId}/polls`, data),

  update: (id: string, data: Partial<Poll>) => api.put<Poll>(`/polls/${id}`, data),

  delete: (id: string) => api.delete(`/polls/${id}`),

  publish: (id: string) => api.post(`/polls/${id}/publish`),

  pause: (id: string) => api.post(`/polls/${id}/pause`),

  close: (id: string) => api.post(`/polls/${id}/close`),

  vote: (id: string, data: VoteRequest) => api.post<VoteResponse>(`/polls/${id}/vote`, data),

  results: (id: string) => api.get<PollResults>(`/polls/${id}/results`),
};

// ============================================
// QUESTIONS API
// ============================================
export const questionsApi = {
  list: (eventId: string) => api.get<Question[]>(`/events/${eventId}/questions`),

  create: (eventId: string, data: QuestionRequest) =>
    api.post<Question>(`/events/${eventId}/questions`, data),

  update: (id: string, data: Partial<Question>) => api.put<Question>(`/questions/${id}`, data),

  approve: (id: string) => api.post(`/questions/${id}/approve`),

  reject: (id: string) => api.post(`/questions/${id}/reject`),

  feature: (id: string) => api.post(`/questions/${id}/feature`),

  answer: (id: string) => api.post(`/questions/${id}/answer`),

  upvote: (id: string) => api.post(`/questions/${id}/upvote`),
};

// ============================================
// ANALYTICS API
// ============================================
export const analyticsApi = {
  get: (eventId: string) => api.get<EventAnalytics>(`/events/${eventId}/analytics`),

  channels: (eventId: string) =>
    api.get<{ online: number; ussd: number }>(`/events/${eventId}/analytics/channels`),

  trends: (eventId: string) =>
    api.get<{ labels: string[]; online: number[]; ussd: number[] }>(`/events/${eventId}/analytics/trends`),

  questions: (eventId: string) =>
    api.get<{ pending: number; approved: number; featured: number; answered: number }>(
      `/events/${eventId}/analytics/questions`
    ),

  ussdFunnel: (eventId: string) =>
    api.get<{
      started: number;
      reachedVoting: number;
      selectedOption: number;
      confirmed: number;
      completionRate: number;
    }>(`/events/${eventId}/analytics/ussd-funnel`),
};

// ============================================
// USSD API
// ============================================
export const ussdApi = {
  callback: (data: UssdCallbackPayload) =>
    api.post<UssdCallbackResponse>("/integrations/africastalking/ussd", data),
};

export default api;
