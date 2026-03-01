import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Job {
  id: string
  title: string
  company: string
  location: string
  category: string
  type: string
  description: string
  requirements?: string
  salary?: string
  logoUrl?: string
  featured: boolean
  createdAt: string
  updatedAt: string
  _count?: { applications: number }
}

export interface Application {
  id: string
  jobId: string
  name: string
  email: string
  resumeLink: string
  coverNote?: string
  createdAt: string
  job?: { title: string; company: string }
}

export interface CreateJobData {
  title: string
  company: string
  location: string
  category: string
  type: string
  description: string
  requirements?: string
  salary?: string
  logoUrl?: string
  featured?: boolean
}

export interface CreateApplicationData {
  jobId: string
  name: string
  email: string
  resumeLink: string
  coverNote?: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface ApiListResponse<T> {
  success: boolean
  count: number
  data: T[]
}

// ─── Jobs ─────────────────────────────────────────────────────────────────────

export const jobsApi = {
  getAll: (params?: {
    search?: string
    category?: string
    location?: string
    type?: string
  }) => api.get<ApiListResponse<Job>>('/jobs', { params }),

  getFeatured: () => api.get<ApiListResponse<Job>>('/jobs/featured'),

  getById: (id: string) => api.get<ApiResponse<Job>>(`/jobs/${id}`),

  getCategories: () =>
    api.get<ApiResponse<{ name: string; count: number }[]>>('/jobs/categories'),

  create: (data: CreateJobData) =>
    api.post<ApiResponse<Job>>('/jobs', data),

  update: (id: string, data: Partial<CreateJobData>) =>
    api.patch<ApiResponse<Job>>(`/jobs/${id}`, data),

  delete: (id: string) =>
    api.delete<ApiResponse<null>>(`/jobs/${id}`),
}

// ─── Applications ─────────────────────────────────────────────────────────────

export const applicationsApi = {
  submit: (data: CreateApplicationData) =>
    api.post<ApiResponse<Application>>('/applications', data),

  getAll: () => api.get<ApiListResponse<Application>>('/applications'),

  getByJob: (jobId: string) =>
    api.get<ApiListResponse<Application>>(`/applications/job/${jobId}`),
}
