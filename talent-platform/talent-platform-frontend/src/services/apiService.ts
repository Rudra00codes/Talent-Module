import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Talent {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  skills: Array<{
    name: string;
    expertiseLevel: string;
  }>;
  description: string;
  profilePhoto?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class ApiService {
  // Set auth token for requests
  setAuthToken(token: string | null): void {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }

  // Generic request handler
  async request<T = any>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    config?: any
  ): Promise<ApiResponse<T>> {
    try {
      const response = await api[method](url, data, config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error(`API Error (${method.toUpperCase()} ${url}):`, error);
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'An error occurred',
      };
    }
  }

  // Talent API methods
  async getAllTalents(): Promise<ApiResponse<Talent[]>> {
    return this.request('get', '/api/talent');
  }

  async getTalentById(id: string): Promise<ApiResponse<Talent>> {
    return this.request('get', `/api/talent/${id}`);
  }

  async registerTalent(talentData: FormData): Promise<ApiResponse<any>> {
    return this.request('post', '/api/talent/register', talentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // Admin API methods
  async getPendingTalents(): Promise<ApiResponse<Talent[]>> {
    return this.request('get', '/api/admin/pending-talents');
  }

  async getAllTalentsAdmin(): Promise<ApiResponse<Talent[]>> {
    return this.request('get', '/api/admin/talents');
  }

  async getTalentByIdAdmin(id: string): Promise<ApiResponse<Talent>> {
    return this.request('get', `/api/admin/talents/${id}`);
  }

  async approveTalent(id: string): Promise<ApiResponse<any>> {
    return this.request('put', `/api/admin/approve/${id}`);
  }

  async rejectTalent(id: string, rejectionReason?: string): Promise<ApiResponse<any>> {
    return this.request('put', `/api/admin/reject/${id}`, { rejectionReason });
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<any>> {
    return this.request('get', '/');
  }
}

export default new ApiService();