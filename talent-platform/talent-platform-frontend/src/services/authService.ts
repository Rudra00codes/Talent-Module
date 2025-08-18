import apiService from './apiService';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'talent' | 'client' | 'admin';
  isApproved: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'talent' | 'client' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
  message: string;
}

class AuthService {
  private tokenKey = 'talent-platform-token';
  private userKey = 'talent-platform-user';

  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await apiService.request('post', '/api/auth/login', loginData);
    if (!response.success) {
      throw new Error(response.error);
    }

    const authData = response.data as AuthResponse;
    this.setToken(authData.token);
    this.setUser(authData.user);
    
    return authData;
  }

  async register(registerData: RegisterData): Promise<AuthResponse> {
    const response = await apiService.request('post', '/api/auth/register', registerData);
    if (!response.success) {
      throw new Error(response.error);
    }

    const authData = response.data as AuthResponse;
    this.setToken(authData.token);
    this.setUser(authData.user);
    
    return authData;
  }

  async getProfile(): Promise<User> {
    const response = await apiService.request('get', '/api/auth/profile');
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.data as User;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    // Update API service to include token in future requests
    apiService.setAuthToken(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setUser(user: User): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    // Remove token from API service
    apiService.setAuthToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }

  // Initialize auth state on app start
  initialize(): void {
    const token = this.getToken();
    if (token) {
      apiService.setAuthToken(token);
    }
  }
}

export default new AuthService();